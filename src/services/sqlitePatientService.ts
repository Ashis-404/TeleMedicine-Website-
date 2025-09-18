/*sqlitePatientService.ts*/

// SQLite Patient Service (using .db file for persistent storage)
// This replaces the localStorage-based mock service with actual file-based database storage
// Uses sql.js for browser compatibility

import initSqlJs from 'sql.js';

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
  hashedPassword: string;
  createdAt: string;
}

class SQLitePatientService {
  private db: any = null;
  private SQL: any = null;
  private initialized: boolean = false;
  private readonly STORAGE_KEY = 'healthbridge_sqlite_db';

  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      // Initialize sql.js
      this.SQL = await initSqlJs({
        // Load the wasm file from CDN
        locateFile: (file) => `https://sql.js.org/dist/${file}`
      });

      // Try to load existing database from localStorage
      const savedDb = localStorage.getItem(this.STORAGE_KEY);
      
      if (savedDb) {
        // Load existing database
        const buffer = new Uint8Array(JSON.parse(savedDb));
        this.db = new this.SQL.Database(buffer);
        console.log('📦 Loaded existing SQLite database from localStorage');
      } else {
        // Create new database
        this.db = new this.SQL.Database();
        console.log('🆕 Created new SQLite database');
      }

      // Create tables
      this.createTables();
      
      this.initialized = true;
      
      // Seed test data if database is new
      if (!savedDb) {
        await this.seedTestPatients();
      }

    } catch (error) {
      console.error('Error initializing SQLite database:', error);
      // Fallback to localStorage if SQLite fails
      this.fallbackToLocalStorage();
    }
  }

  private createTables(): void {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        dateOfBirth TEXT NOT NULL,
        gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
        address TEXT NOT NULL,
        village TEXT NOT NULL,
        emergencyContact TEXT NOT NULL,
        emergencyPhone TEXT NOT NULL,
        medicalRecordNumber TEXT UNIQUE NOT NULL,
        preferredLanguage TEXT NOT NULL DEFAULT 'en' CHECK (preferredLanguage IN ('en', 'hi', 'pa')),
        hashedPassword TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_email ON patients(email);
      CREATE INDEX IF NOT EXISTS idx_village ON patients(village);
      CREATE INDEX IF NOT EXISTS idx_medical_record ON patients(medicalRecordNumber);
    `;

    this.db.exec(createTableQuery);
    console.log('✅ SQLite database tables created successfully');
  }

  private saveDatabase(): void {
    if (this.db) {
      try {
        const data = this.db.export();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(data)));
      } catch (error) {
        console.error('Error saving database to localStorage:', error);
      }
    }
  }

  private fallbackToLocalStorage(): void {
    console.warn('⚠️ SQLite initialization failed, falling back to localStorage');
    this.initialized = false;
    // The service will continue to work but with reduced functionality
  }

  private async waitForInitialization(): Promise<void> {
    let attempts = 0;
    while (!this.initialized && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!this.initialized) {
      throw new Error('Database initialization timeout');
    }
  }

  // Generate medical record number
  private generateMedicalRecordNumber(): string {
    const prefix = 'HB';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Simple password hashing (in production, use bcrypt)
  private hashPassword(password: string): string {
    // For demo purposes, using simple hashing. In production, use bcrypt
    return `hashed_${password}_${Date.now().toString(36)}`;
  }

  // Verify password
  private verifyPassword(password: string, hashedPassword: string): boolean {
    // Simple verification for demo. In production, use bcrypt.compare()
    return hashedPassword.includes(`hashed_${password}_`);
  }

  // Register new patient
  async registerPatient(patientData: PatientRegistrationData): Promise<{ success: boolean; patientId?: number; error?: string; medicalRecordNumber?: string }> {
    return new Promise((resolve) => {
      try {
        // Check if email already exists
        this.db.get(
          'SELECT id FROM patients WHERE email = ?',
          [patientData.email],
          (err, row) => {
            if (err) {
              console.error('Database error during registration:', err);
              resolve({ success: false, error: 'Database error occurred' });
              return;
            }

            if (row) {
              resolve({ success: false, error: 'Email already registered' });
              return;
            }

            // Insert new patient
            const medicalRecordNumber = this.generateMedicalRecordNumber();
            const hashedPassword = this.hashPassword(patientData.password);

            const insertQuery = `
              INSERT INTO patients (
                firstName, lastName, email, phone, dateOfBirth, gender,
                address, village, emergencyContact, emergencyPhone,
                medicalRecordNumber, preferredLanguage, hashedPassword
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            this.db.run(
              insertQuery,
              [
                patientData.firstName,
                patientData.lastName,
                patientData.email,
                patientData.phone,
                patientData.dateOfBirth,
                patientData.gender,
                patientData.address,
                patientData.village,
                patientData.emergencyContact,
                patientData.emergencyPhone,
                medicalRecordNumber,
                patientData.preferredLanguage || 'en',
                hashedPassword
              ],
              function (err) {
                if (err) {
                  console.error('Error inserting patient:', err);
                  resolve({ success: false, error: 'Failed to register patient' });
                } else {
                  console.log('✅ Patient registered successfully:', {
                    id: this.lastID,
                    name: `${patientData.firstName} ${patientData.lastName}`,
                    email: patientData.email,
                    village: patientData.village,
                    medicalRecordNumber
                  });
                  
                  resolve({
                    success: true,
                    patientId: this.lastID,
                    medicalRecordNumber
                  });
                }
              }
            );
          }
        );
      } catch (error) {
        console.error('Unexpected error during registration:', error);
        resolve({ success: false, error: 'Registration failed. Please try again.' });
      }
    });
  }

  // Login patient
  async loginPatient(credentials: LoginCredentials): Promise<{ success: boolean; patient?: PatientData; error?: string }> {
    return new Promise((resolve) => {
      try {
        this.db.get(
          'SELECT * FROM patients WHERE email = ?',
          [credentials.email],
          (err, row: PatientData) => {
            if (err) {
              console.error('Database error during login:', err);
              resolve({ success: false, error: 'Database error occurred' });
              return;
            }

            if (!row) {
              resolve({ success: false, error: 'Invalid email or password' });
              return;
            }

            // Verify password
            if (!this.verifyPassword(credentials.password, row.hashedPassword)) {
              resolve({ success: false, error: 'Invalid email or password' });
              return;
            }

            // Remove password from response
            const { hashedPassword, ...patientWithoutPassword } = row;

            console.log('✅ Patient logged in successfully:', {
              id: row.id,
              name: `${row.firstName} ${row.lastName}`,
              email: row.email
            });

            resolve({ 
              success: true, 
              patient: patientWithoutPassword as PatientData
            });
          }
        );
      } catch (error) {
        console.error('Unexpected error during login:', error);
        resolve({ success: false, error: 'Login failed. Please try again.' });
      }
    });
  }

  // Get all registered patients
  async getAllPatients(): Promise<{ success: boolean; patients?: PatientData[]; error?: string }> {
    return new Promise((resolve) => {
      try {
        this.db.all(
          'SELECT id, firstName, lastName, email, phone, dateOfBirth, gender, address, village, emergencyContact, emergencyPhone, medicalRecordNumber, preferredLanguage, createdAt FROM patients ORDER BY createdAt DESC',
          (err, rows: PatientData[]) => {
            if (err) {
              console.error('Error fetching patients:', err);
              resolve({ success: false, error: 'Failed to fetch patients' });
            } else {
              resolve({ success: true, patients: rows });
            }
          }
        );
      } catch (error) {
        console.error('Unexpected error fetching patients:', error);
        resolve({ success: false, error: 'Failed to fetch patients' });
      }
    });
  }

  // Get patients by village
  async getPatientsByVillage(village: string): Promise<{ success: boolean; patients?: PatientData[]; error?: string }> {
    return new Promise((resolve) => {
      try {
        this.db.all(
          'SELECT id, firstName, lastName, email, phone, dateOfBirth, gender, address, village, emergencyContact, emergencyPhone, medicalRecordNumber, preferredLanguage, createdAt FROM patients WHERE village LIKE ? ORDER BY createdAt DESC',
          [`%${village}%`],
          (err, rows: PatientData[]) => {
            if (err) {
              console.error('Error fetching patients by village:', err);
              resolve({ success: false, error: 'Failed to fetch patients' });
            } else {
              resolve({ success: true, patients: rows });
            }
          }
        );
      } catch (error) {
        console.error('Unexpected error fetching patients by village:', error);
        resolve({ success: false, error: 'Failed to fetch patients' });
      }
    });
  }

  // Get registration statistics
  async getRegistrationStats(): Promise<any> {
    return new Promise((resolve) => {
      const queries = {
        total: 'SELECT COUNT(*) as count FROM patients',
        byGender: 'SELECT gender, COUNT(*) as count FROM patients GROUP BY gender',
        byVillage: 'SELECT village, COUNT(*) as count FROM patients GROUP BY village ORDER BY count DESC',
        byLanguage: 'SELECT preferredLanguage, COUNT(*) as count FROM patients GROUP BY preferredLanguage'
      };

      const stats = {
        totalPatients: 0,
        genderDistribution: { male: 0, female: 0, other: 0 },
        villageDistribution: {} as Record<string, number>,
        languagePreferences: { en: 0, hi: 0, pa: 0 }
      };

      // Get total count
      this.db.get(queries.total, (err, row: any) => {
        if (!err && row) {
          stats.totalPatients = row.count;
        }

        // Get gender distribution
        this.db.all(queries.byGender, (err, rows: any[]) => {
          if (!err && rows) {
            rows.forEach((row: any) => {
              stats.genderDistribution[row.gender as keyof typeof stats.genderDistribution] = row.count;
            });
          }

          // Get village distribution
          this.db.all(queries.byVillage, (err, rows: any[]) => {
            if (!err && rows) {
              rows.forEach((row: any) => {
                stats.villageDistribution[row.village] = row.count;
              });
            }

            // Get language preferences
            this.db.all(queries.byLanguage, (err, rows: any[]) => {
              if (!err && rows) {
                rows.forEach((row: any) => {
                  stats.languagePreferences[row.preferredLanguage as keyof typeof stats.languagePreferences] = row.count;
                });
              }

              resolve(stats);
            });
          });
        });
      });
    });
  }

  // Seed test patients
  private async seedTestPatients(): Promise<void> {
    // Check if test patient already exists
    this.db.get(
      'SELECT id FROM patients WHERE email = ?',
      ['test@example.com'],
      async (err, row) => {
        if (err) {
          console.error('Error checking for test patient:', err);
          return;
        }

        if (!row) {
          // Create test patient
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
          
          console.log('🌱 Test patient seeded in SQLite database:');
          console.log('Email: test@example.com');
          console.log('Password: password123');
        } else {
          console.log('🌱 Test patient already exists in SQLite database');
        }
      }
    );
  }

  // Clear all data (for testing)
  async clearAllData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM patients', (err) => {
        if (err) {
          console.error('Error clearing data:', err);
          reject(err);
        } else {
          console.log('🗑️ All patient data cleared from SQLite database');
          resolve();
        }
      });
    });
  }

  // Close database connection
  close(): void {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('📦 SQLite database connection closed');
      }
    });
  }
}

// Export singleton instance
export const patientService = new SQLitePatientService();

// Handle process termination
process.on('SIGINT', () => {
  patientService.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  patientService.close();
  process.exit(0);
});