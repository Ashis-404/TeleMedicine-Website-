// Mock Patient Service (for development without database)
// This will be replaced with the actual PatientService once database is set up
// 
// FEATURES:
// - Persistent storage using localStorage (data survives page refresh/server restart)
// - Password hashing simulation
// - Registration and login validation
// - Test patient seeding

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
  hashedPassword: string; // Store hashed password for login verification
  createdAt: Date;
}

// Mock database storage with persistence (in real app, this will be MySQL)
const STORAGE_KEY = 'healthbridge_patients';

class MockDatabase {
  private data: PatientData[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        // Convert date strings back to Date objects
        this.data = parsedData.map((patient: any) => ({
          ...patient,
          createdAt: new Date(patient.createdAt)
        }));
        console.log(`📦 Loaded ${this.data.length} patients from localStorage`);
      }
    } catch (error) {
      console.warn('Failed to load patient data from localStorage:', error);
      this.data = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.warn('Failed to save patient data to localStorage:', error);
    }
  }

  find(predicate: (patient: PatientData) => boolean): PatientData | undefined {
    return this.data.find(predicate);
  }

  filter(predicate: (patient: PatientData) => boolean): PatientData[] {
    return this.data.filter(predicate);
  }

  push(patient: PatientData): void {
    this.data.push(patient);
    this.saveToStorage();
  }

  get length(): number {
    return this.data.length;
  }

  forEach(callback: (patient: PatientData) => void): void {
    this.data.forEach(callback);
  }

  getAll(): PatientData[] {
    return [...this.data];
  }

  clear(): void {
    this.data = [];
    localStorage.removeItem(STORAGE_KEY);
  }
}

const mockDatabase = new MockDatabase();

export class MockPatientService {
  // Generate medical record number
  private generateMedicalRecordNumber(): string {
    const prefix = 'HB';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Mock password hashing (in real app, this will be bcrypt)
  private hashPassword(password: string): string {
    return `hashed_${password}`;
  }

  // Register new patient (Mock implementation)
  async registerPatient(patientData: PatientRegistrationData): Promise<{ success: boolean; patientId?: number; error?: string; medicalRecordNumber?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists
      const existingPatient = mockDatabase.find(p => p.email === patientData.email);
      if (existingPatient) {
        return { success: false, error: 'Email already registered' };
      }

      // Create patient record
      const newPatient: PatientData = {
        id: mockDatabase.length + 1,
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
        medicalRecordNumber: this.generateMedicalRecordNumber(),
        preferredLanguage: patientData.preferredLanguage || 'en',
        hashedPassword: this.hashPassword(patientData.password), // Store hashed password
        createdAt: new Date()
      };

      // Store in mock database
      mockDatabase.push(newPatient);

      console.log('✅ Patient registered successfully:', {
        id: newPatient.id,
        name: `${newPatient.firstName} ${newPatient.lastName}`,
        email: newPatient.email,
        village: newPatient.village,
        medicalRecordNumber: newPatient.medicalRecordNumber
      });

      return { 
        success: true, 
        patientId: newPatient.id,
        medicalRecordNumber: newPatient.medicalRecordNumber
      };

    } catch (error) {
      console.error('Error registering patient:', error);
      return { 
        success: false, 
        error: 'Registration failed. Please try again.' 
      };
    }
  }

  // Login patient (Mock implementation)
  async loginPatient(credentials: LoginCredentials): Promise<{ success: boolean; patient?: PatientData; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Find patient by email
      const patient = mockDatabase.find(p => p.email === credentials.email);
      
      if (!patient) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Verify password by comparing hashed versions
      const hashedInputPassword = this.hashPassword(credentials.password);
      if (hashedInputPassword !== patient.hashedPassword) {
        return { success: false, error: 'Invalid email or password' };
      }

      console.log('✅ Patient logged in successfully:', {
        id: patient.id,
        name: `${patient.firstName} ${patient.lastName}`,
        email: patient.email
      });

      return { success: true, patient };

    } catch (error) {
      console.error('Error during login:', error);
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  }

  // Get all registered patients (for demo purposes)
  async getAllPatients(): Promise<{ success: boolean; patients?: PatientData[]; error?: string }> {
    try {
      return { success: true, patients: mockDatabase.getAll() };
    } catch (error) {
      return { success: false, error: 'Failed to fetch patients' };
    }
  }

  // Get patients by village
  async getPatientsByVillage(village: string): Promise<{ success: boolean; patients?: PatientData[]; error?: string }> {
    try {
      const patients = mockDatabase.filter(p => 
        p.village.toLowerCase().includes(village.toLowerCase())
      );
      return { success: true, patients };
    } catch (error) {
      return { success: false, error: 'Failed to fetch patients' };
    }
  }

  // Get registration statistics
  getRegistrationStats() {
    const stats = {
      totalPatients: mockDatabase.length,
      villageDistribution: {} as Record<string, number>,
      genderDistribution: { male: 0, female: 0, other: 0 },
      languagePreferences: { en: 0, hi: 0, pa: 0 }
    };

    mockDatabase.forEach(patient => {
      // Village distribution
      stats.villageDistribution[patient.village] = 
        (stats.villageDistribution[patient.village] || 0) + 1;

      // Gender distribution
      stats.genderDistribution[patient.gender]++;

      // Language preferences
      stats.languagePreferences[patient.preferredLanguage]++;
    });

    return stats;
  }

  // Seed database with test patients (for development)
  seedTestPatients() {
    // Check if test patient already exists
    const existingTestPatient = mockDatabase.find(p => p.email === 'test@example.com');
    
    if (!existingTestPatient) {
      const testPatients = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          phone: '9876543210',
          dateOfBirth: '1990-01-01',
          gender: 'male' as const,
          address: '123 Main St',
          village: 'Riverside',
          emergencyContact: 'Jane Doe',
          emergencyPhone: '9876543211',
          password: 'password123',
          preferredLanguage: 'en' as const
        }
      ];

      testPatients.forEach(async (testPatient) => {
        await this.registerPatient(testPatient);
      });

      console.log('🌱 Test patients seeded. You can now sign in with:');
      console.log('Email: test@example.com');
      console.log('Password: password123');
    } else {
      console.log('🌱 Test patient already exists in persistent storage');
    }
  }

  // Clear all patient data (for development/testing)
  clearAllData() {
    mockDatabase.clear();
    console.log('🗑️ All patient data cleared from localStorage');
  }
}

// Export singleton instance
export const patientService = new MockPatientService();

// Initialize with test data for development
patientService.seedTestPatients();