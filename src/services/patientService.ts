/*patientService.ts*/

// Patient service for database operations
import bcrypt from 'bcrypt';

// Types for patient data
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

export interface PatientData {
  id?: number;
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
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  lastLogin?: Date;
  profilePictureUrl?: string;
  medicalRecordNumber?: string;
  preferredLanguage?: 'en' | 'hi' | 'pa';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export class PatientService {
  private pool: any; // Will be initialized from database config

  constructor(connectionPool: any) {
    this.pool = connectionPool;
  }

  // Generate medical record number
  private generateMedicalRecordNumber(): string {
    const prefix = 'HB';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Hash password
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify password
  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  // Register new patient
  async registerPatient(patientData: PatientRegistrationData): Promise<{ success: boolean; patientId?: number; error?: string }> {
    const connection = await this.pool.getConnection();
    
    try {
      // Check if email already exists
      const [existingPatient] = await connection.execute(
        'SELECT id FROM patients WHERE email = ?',
        [patientData.email]
      );

      if (Array.isArray(existingPatient) && existingPatient.length > 0) {
        return { success: false, error: 'Email already registered' };
      }

      // Hash password
      const passwordHash = await this.hashPassword(patientData.password);

      // Generate medical record number
      const medicalRecordNumber = this.generateMedicalRecordNumber();

      // Insert patient data
      const [result] = await connection.execute(
        `INSERT INTO patients (
          first_name, last_name, email, phone, date_of_birth, gender,
          address, village, emergency_contact_name, emergency_contact_phone,
          password_hash, medical_record_number, preferred_language
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
          passwordHash,
          medicalRecordNumber,
          patientData.preferredLanguage || 'en'
        ]
      );

      const insertResult = result as any;
      
      return { 
        success: true, 
        patientId: insertResult.insertId 
      };

    } catch (error) {
      console.error('Error registering patient:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    } finally {
      connection.release();
    }
  }

  // Login patient
  async loginPatient(credentials: LoginCredentials): Promise<{ success: boolean; patient?: PatientData; error?: string }> {
    const connection = await this.pool.getConnection();
    
    try {
      // Get patient by email
      const [rows] = await connection.execute(
        `SELECT id, first_name, last_name, email, phone, date_of_birth, gender,
         address, village, emergency_contact_name, emergency_contact_phone,
         password_hash, created_at, updated_at, is_active, email_verified,
         phone_verified, last_login, profile_picture_url, medical_record_number,
         preferred_language
         FROM patients WHERE email = ? AND is_active = TRUE`,
        [credentials.email]
      );

      const patients = rows as any[];
      
      if (patients.length === 0) {
        return { success: false, error: 'Invalid email or password' };
      }

      const patient = patients[0];

      // Verify password
      const passwordMatch = await this.verifyPassword(credentials.password, patient.password_hash);
      
      if (!passwordMatch) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Update last login
      await connection.execute(
        'UPDATE patients SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [patient.id]
      );

      // Return patient data (excluding password hash)
      const patientData: PatientData = {
        id: patient.id,
        firstName: patient.first_name,
        lastName: patient.last_name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.date_of_birth,
        gender: patient.gender,
        address: patient.address,
        village: patient.village,
        emergencyContact: patient.emergency_contact_name,
        emergencyPhone: patient.emergency_contact_phone,
        createdAt: patient.created_at,
        updatedAt: patient.updated_at,
        isActive: patient.is_active,
        emailVerified: patient.email_verified,
        phoneVerified: patient.phone_verified,
        lastLogin: patient.last_login,
        profilePictureUrl: patient.profile_picture_url,
        medicalRecordNumber: patient.medical_record_number,
        preferredLanguage: patient.preferred_language
      };

      return { success: true, patient: patientData };

    } catch (error) {
      console.error('Error during login:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    } finally {
      connection.release();
    }
  }

  // Get patient by ID
  async getPatientById(patientId: number): Promise<{ success: boolean; patient?: PatientData; error?: string }> {
    const connection = await this.pool.getConnection();
    
    try {
      const [rows] = await connection.execute(
        `SELECT id, first_name, last_name, email, phone, date_of_birth, gender,
         address, village, emergency_contact_name, emergency_contact_phone,
         created_at, updated_at, is_active, email_verified, phone_verified,
         last_login, profile_picture_url, medical_record_number, preferred_language
         FROM patients WHERE id = ? AND is_active = TRUE`,
        [patientId]
      );

      const patients = rows as any[];
      
      if (patients.length === 0) {
        return { success: false, error: 'Patient not found' };
      }

      const patient = patients[0];
      const patientData: PatientData = {
        id: patient.id,
        firstName: patient.first_name,
        lastName: patient.last_name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.date_of_birth,
        gender: patient.gender,
        address: patient.address,
        village: patient.village,
        emergencyContact: patient.emergency_contact_name,
        emergencyPhone: patient.emergency_contact_phone,
        createdAt: patient.created_at,
        updatedAt: patient.updated_at,
        isActive: patient.is_active,
        emailVerified: patient.email_verified,
        phoneVerified: patient.phone_verified,
        lastLogin: patient.last_login,
        profilePictureUrl: patient.profile_picture_url,
        medicalRecordNumber: patient.medical_record_number,
        preferredLanguage: patient.preferred_language
      };

      return { success: true, patient: patientData };

    } catch (error) {
      console.error('Error fetching patient:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch patient' 
      };
    } finally {
      connection.release();
    }
  }

  // Update patient information
  async updatePatient(patientId: number, updateData: Partial<PatientData>): Promise<{ success: boolean; error?: string }> {
    const connection = await this.pool.getConnection();
    
    try {
      const updateFields = [];
      const updateValues = [];

      // Build dynamic update query
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id' && key !== 'passwordHash') {
          // Convert camelCase to snake_case for database columns
          const dbColumn = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
          updateFields.push(`${dbColumn} = ?`);
          updateValues.push(value);
        }
      });

      if (updateFields.length === 0) {
        return { success: false, error: 'No fields to update' };
      }

      updateValues.push(patientId);

      const [result] = await connection.execute(
        `UPDATE patients SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        updateValues
      );

      const updateResult = result as any;

      if (updateResult.affectedRows === 0) {
        return { success: false, error: 'Patient not found' };
      }

      return { success: true };

    } catch (error) {
      console.error('Error updating patient:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update patient' 
      };
    } finally {
      connection.release();
    }
  }

  // Get patients by village (for analytics)
  async getPatientsByVillage(village: string): Promise<{ success: boolean; patients?: PatientData[]; error?: string }> {
    const connection = await this.pool.getConnection();
    
    try {
      const [rows] = await connection.execute(
        `SELECT id, first_name, last_name, email, phone, date_of_birth, gender,
         address, village, emergency_contact_name, emergency_contact_phone,
         created_at, medical_record_number, preferred_language
         FROM patients WHERE village = ? AND is_active = TRUE
         ORDER BY created_at DESC`,
        [village]
      );

      const patients = (rows as any[]).map(patient => ({
        id: patient.id,
        firstName: patient.first_name,
        lastName: patient.last_name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.date_of_birth,
        gender: patient.gender,
        address: patient.address,
        village: patient.village,
        emergencyContact: patient.emergency_contact_name,
        emergencyPhone: patient.emergency_contact_phone,
        createdAt: patient.created_at,
        medicalRecordNumber: patient.medical_record_number,
        preferredLanguage: patient.preferred_language
      }));

      return { success: true, patients };

    } catch (error) {
      console.error('Error fetching patients by village:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch patients' 
      };
    } finally {
      connection.release();
    }
  }
}