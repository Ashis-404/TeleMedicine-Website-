/*indexedDBPatientService.ts*/

// IndexedDB Patient Service (using browser's built-in database for persistent storage)
// This provides real database functionality with file-like persistence in the browser

export interface PatientRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  village: string;
  emergencyContact: string;
  emergencyPhone: string;
  password: string;
  preferredLanguage?: 'en' | 'hi' | 'pa';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminData {
  id: number;
  username: string;
  email: string;
  hashedPassword: string;
  role: 'admin' | 'super_admin';
  createdAt: Date;
}

export interface PatientData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  village: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalRecordNumber: string;
  preferredLanguage: 'en' | 'hi' | 'pa';
  hashedPassword: string;
  createdAt: Date;
}

class IndexedDBPatientService {
  private dbName: string = 'HealthBridgeDB';
  private version: number = 2; // Incremented version to trigger admin table creation
  private db: IDBDatabase | null = null;

  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Error opening IndexedDB database:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('✅ IndexedDB database initialized successfully');
        
        // Seed test patient after database is ready
        this.seedTestPatients();
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create patients object store
        if (!db.objectStoreNames.contains('patients')) {
          const patientStore = db.createObjectStore('patients', { 
            keyPath: 'id', 
            autoIncrement: true 
          });

          // Create indexes for efficient querying
          patientStore.createIndex('email', 'email', { unique: true });
          patientStore.createIndex('village', 'village', { unique: false });
          patientStore.createIndex('medicalRecordNumber', 'medicalRecordNumber', { unique: true });
          patientStore.createIndex('createdAt', 'createdAt', { unique: false });

          console.log('📋 Created patients object store with indexes');
        }

        // Create admins object store
        if (!db.objectStoreNames.contains('admins')) {
          const adminStore = db.createObjectStore('admins', { 
            keyPath: 'id', 
            autoIncrement: true 
          });

          // Create indexes for admin queries
          adminStore.createIndex('username', 'username', { unique: true });
          adminStore.createIndex('email', 'email', { unique: true });

          console.log('👨‍💼 Created admins object store with indexes');
        }
      };
    });
  }

  // Generate medical record number
  private generateMedicalRecordNumber(): string {
    const prefix = 'HB';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Simple password hashing
  private hashPassword(password: string): string {
    return `hashed_${password}_${Date.now().toString(36)}`;
  }

  // Verify password
  private verifyPassword(password: string, hashedPassword: string): boolean {
    return hashedPassword.includes(`hashed_${password}_`);
  }

  // Register new patient
  async registerPatient(patientData: PatientRegistrationData): Promise<{ 
    success: boolean; 
    patientId?: number; 
    error?: string; 
    medicalRecordNumber?: string 
  }> {
    if (!this.db) {
      return { success: false, error: 'Database not initialized' };
    }

    try {
      // Check if email already exists
      const existingPatient = await this.getPatientByEmail(patientData.email);
      if (existingPatient) {
        return { success: false, error: 'Email already registered' };
      }

      // Create patient record
      const medicalRecordNumber = this.generateMedicalRecordNumber();
      const hashedPassword = this.hashPassword(patientData.password);

      const newPatient: Omit<PatientData, 'id'> = {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        email: patientData.email,
        phone: patientData.phone,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        address: patientData.address,
        village: patientData.village,
        emergencyContact: patientData.emergencyContact,
        emergencyPhone: patientData.emergencyPhone,
        medicalRecordNumber,
        preferredLanguage: patientData.preferredLanguage || 'en',
        hashedPassword,
        createdAt: new Date()
      };

      // Insert into database
      const patientId = await this.addPatient(newPatient);

      console.log('✅ Patient registered successfully:', {
        id: patientId,
        name: `${patientData.firstName} ${patientData.lastName}`,
        email: patientData.email,
        village: patientData.village,
        medicalRecordNumber
      });

      return {
        success: true,
        patientId,
        medicalRecordNumber
      };

    } catch (error) {
      console.error('Error registering patient:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  // Login patient
  async loginPatient(credentials: LoginCredentials): Promise<{ 
    success: boolean; 
    patient?: Omit<PatientData, 'hashedPassword'>; 
    error?: string 
  }> {
    if (!this.db) {
      return { success: false, error: 'Database not initialized' };
    }

    try {
      const patient = await this.getPatientByEmail(credentials.email);

      if (!patient) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Verify password
      if (!this.verifyPassword(credentials.password, patient.hashedPassword)) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Remove password from response
      const { hashedPassword, ...patientWithoutPassword } = patient;

      console.log('✅ Patient logged in successfully:', {
        id: patient.id,
        name: `${patient.firstName} ${patient.lastName}`,
        email: patient.email
      });

      return { 
        success: true, 
        patient: patientWithoutPassword 
      };

    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  // Login admin
  async loginAdmin(credentials: AdminCredentials): Promise<{ 
    success: boolean; 
    admin?: Omit<AdminData, 'hashedPassword'>; 
    error?: string 
  }> {
    console.log('🔐 Attempting admin login for username:', credentials.username);
    
    if (!this.db) {
      console.error('❌ Database not initialized during admin login');
      return { success: false, error: 'Database not initialized' };
    }

    try {
      const admin = await this.getAdminByUsername(credentials.username);

      if (!admin) {
        console.log('❌ Admin not found for username:', credentials.username);
        return { success: false, error: 'Invalid username or password' };
      }

      console.log('✅ Admin found:', admin.username, 'Role:', admin.role);

      // Verify password
      const passwordValid = this.verifyPassword(credentials.password, admin.hashedPassword);
      console.log('🔑 Password verification result:', passwordValid);
      
      if (!passwordValid) {
        console.log('❌ Password verification failed for admin:', credentials.username);
        return { success: false, error: 'Invalid username or password' };
      }

      // Remove password from response
      const { hashedPassword, ...adminWithoutPassword } = admin;

      console.log('✅ Admin logged in successfully:', {
        id: admin.id,
        username: admin.username,
        role: admin.role
      });

      return { 
        success: true, 
        admin: adminWithoutPassword 
      };

    } catch (error) {
      console.error('❌ Error during admin login:', error);
      return { success: false, error: 'Admin login failed. Please try again.' };
    }
  }

  // Get all patients
  async getAllPatients(): Promise<{ success: boolean; patients?: Omit<PatientData, 'hashedPassword'>[]; error?: string }> {
    if (!this.db) {
      return { success: false, error: 'Database not initialized' };
    }

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(['patients'], 'readonly');
      const store = transaction.objectStore('patients');
      const request = store.getAll();

      request.onsuccess = () => {
        const patients = request.result.map(({ hashedPassword, ...patient }) => patient);
        resolve({ success: true, patients });
      };

      request.onerror = () => {
        console.error('Error fetching all patients:', request.error);
        resolve({ success: false, error: 'Failed to fetch patients' });
      };
    });
  }

  // Get patients by village
  async getPatientsByVillage(village: string): Promise<{ success: boolean; patients?: Omit<PatientData, 'hashedPassword'>[]; error?: string }> {
    if (!this.db) {
      return { success: false, error: 'Database not initialized' };
    }

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(['patients'], 'readonly');
      const store = transaction.objectStore('patients');
      const index = store.index('village');
      const request = index.getAll(village);

      request.onsuccess = () => {
        const patients = request.result
          .filter(p => p.village.toLowerCase().includes(village.toLowerCase()))
          .map(({ hashedPassword, ...patient }) => patient);
        resolve({ success: true, patients });
      };

      request.onerror = () => {
        console.error('Error fetching patients by village:', request.error);
        resolve({ success: false, error: 'Failed to fetch patients' });
      };
    });
  }

  // Get registration statistics
  async getRegistrationStats(): Promise<{
    totalPatients: number;
    genderDistribution: { male: number; female: number; other: number };
    villageDistribution: Record<string, number>;
    languagePreferences: { en: number; hi: number; pa: number };
  }> {
    const allPatients = await this.getAllPatients();
    
    const stats = {
      totalPatients: 0,
      genderDistribution: { male: 0, female: 0, other: 0 },
      villageDistribution: {} as Record<string, number>,
      languagePreferences: { en: 0, hi: 0, pa: 0 }
    };

    if (allPatients.success && allPatients.patients) {
      stats.totalPatients = allPatients.patients.length;

      allPatients.patients.forEach(patient => {
        // Gender distribution
        stats.genderDistribution[patient.gender]++;

        // Village distribution
        stats.villageDistribution[patient.village] = 
          (stats.villageDistribution[patient.village] || 0) + 1;

        // Language preferences
        stats.languagePreferences[patient.preferredLanguage]++;
      });
    }

    return stats;
  }

  // Helper methods
  private async getPatientByEmail(email: string): Promise<PatientData | null> {
    if (!this.db) return null;

    return new Promise((resolve) => {
      const transaction = this.db!.transaction(['patients'], 'readonly');
      const store = transaction.objectStore('patients');
      const index = store.index('email');
      const request = index.get(email);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        console.error('Error getting patient by email:', request.error);
        resolve(null);
      };
    });
  }

  private async getAdminByUsername(username: string): Promise<AdminData | null> {
    if (!this.db) {
      console.error('❌ Database not initialized when trying to get admin by username');
      return null;
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db!.transaction(['admins'], 'readonly');
        const store = transaction.objectStore('admins');
        const index = store.index('username');
        const request = index.get(username);

        request.onsuccess = () => {
          console.log(`🔍 Admin lookup for '${username}':`, request.result || 'Not found');
          resolve(request.result || null);
        };

        request.onerror = () => {
          console.error('❌ Error getting admin by username:', request.error);
          resolve(null);
        };

        transaction.onerror = () => {
          console.error('❌ Transaction error getting admin by username:', transaction.error);
          resolve(null);
        };
      } catch (error) {
        console.error('❌ Exception in getAdminByUsername:', error);
        resolve(null);
      }
    });
  }

  private async addPatient(patient: Omit<PatientData, 'id'>): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['patients'], 'readwrite');
      const store = transaction.objectStore('patients');
      const request = store.add(patient);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private async addAdmin(admin: Omit<AdminData, 'id'>): Promise<number> {
    if (!this.db) {
      console.error('❌ Database not initialized when trying to add admin');
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db!.transaction(['admins'], 'readwrite');
        const store = transaction.objectStore('admins');
        const request = store.add(admin);

        request.onsuccess = () => {
          console.log('✅ Admin added successfully with ID:', request.result);
          resolve(request.result as number);
        };

        request.onerror = () => {
          console.error('❌ Error adding admin:', request.error);
          reject(request.error);
        };

        transaction.onerror = () => {
          console.error('❌ Transaction error adding admin:', transaction.error);
          reject(transaction.error);
        };
      } catch (error) {
        console.error('❌ Exception in addAdmin:', error);
        reject(error);
      }
    });
  }

  // Seed test patients and admin
  private async seedTestPatients(): Promise<void> {
    try {
      console.log('🌱 Starting seeding process...');
      
      // Small delay to ensure database is fully initialized
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Seed test patient
      const existingPatient = await this.getPatientByEmail('test@example.com');
      
      if (!existingPatient) {
        const testPatient: PatientRegistrationData = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          phone: '9876543210',
          dateOfBirth: '1990-01-01',
          gender: 'male',
          address: '123 Main St',
          village: 'Riverside',
          emergencyContact: 'Jane Doe',
          emergencyPhone: '9876543211',
          password: 'password123',
          preferredLanguage: 'en'
        };

        await this.registerPatient(testPatient);
        
        console.log('🌱 Test patient seeded in IndexedDB:');
        console.log('Email: test@example.com');
        console.log('Password: password123');
      } else {
        console.log('🌱 Test patient already exists in IndexedDB');
      }

      // Seed test admin
      console.log('👨‍💼 Checking for existing admin...');
      const existingAdmin = await this.getAdminByUsername('admin');
      
      if (!existingAdmin) {
        console.log('👨‍💼 Creating test admin...');
        const testAdmin: Omit<AdminData, 'id'> = {
          username: 'admin',
          email: 'admin@healthbridge.com',
          hashedPassword: this.hashPassword('admin123'),
          role: 'admin',
          createdAt: new Date()
        };

        const adminId = await this.addAdmin(testAdmin);
        
        console.log('👨‍💼 Test admin seeded in IndexedDB with ID:', adminId);
        console.log('Username: admin');
        console.log('Password: admin123');
      } else {
        console.log('👨‍💼 Test admin already exists in IndexedDB');
      }

      // Seed super admin
      console.log('🔒 Checking for existing super admin...');
      const existingSuperAdmin = await this.getAdminByUsername('superadmin');
      
      if (!existingSuperAdmin) {
        console.log('🔒 Creating super admin...');
        const superAdmin: Omit<AdminData, 'id'> = {
          username: 'superadmin',
          email: 'superadmin@healthbridge.com',
          hashedPassword: this.hashPassword('super123'),
          role: 'super_admin',
          createdAt: new Date()
        };

        const superAdminId = await this.addAdmin(superAdmin);
        
        console.log('🔒 Super admin seeded in IndexedDB with ID:', superAdminId);
        console.log('Username: superadmin');
        console.log('Password: super123');
      } else {
        console.log('🔒 Super admin already exists in IndexedDB');
      }

    } catch (error) {
      console.error('❌ Error seeding test data:', error);
    }
  }

  // Clear all data (for testing)
  async clearAllData(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['patients', 'admins'], 'readwrite');
      
      // Clear patients
      const patientStore = transaction.objectStore('patients');
      const patientRequest = patientStore.clear();
      
      // Clear admins
      const adminStore = transaction.objectStore('admins');
      const adminRequest = adminStore.clear();

      let completedOperations = 0;
      const totalOperations = 2;

      const checkCompletion = () => {
        completedOperations++;
        if (completedOperations === totalOperations) {
          console.log('🗑️ All patient and admin data cleared from IndexedDB');
          resolve();
        }
      };

      patientRequest.onsuccess = checkCompletion;
      adminRequest.onsuccess = checkCompletion;

      patientRequest.onerror = () => {
        console.error('Error clearing patient data:', patientRequest.error);
        reject(patientRequest.error);
      };

      adminRequest.onerror = () => {
        console.error('Error clearing admin data:', adminRequest.error);
        reject(adminRequest.error);
      };
    });
  }

  // Export database to file (download as JSON)
  async exportToFile(): Promise<void> {
    const result = await this.getAllPatients();
    
    if (result.success && result.patients) {
      const dataStr = JSON.stringify({
        exportDate: new Date().toISOString(),
        version: this.version,
        patients: result.patients
      }, null, 2);
      
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `healthbridge_patients_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      console.log('📁 Database exported to JSON file');
    }
  }
}

// Export singleton instance
export const patientService = new IndexedDBPatientService();