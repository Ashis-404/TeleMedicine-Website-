# Database Setup Instructions for HealthBridge

## Required Dependencies

To set up the patient database functionality, you'll need to install the following dependencies:

```bash
# Install database and security dependencies
npm install mysql2 bcrypt
npm install --save-dev @types/bcrypt

# Alternative: If using PostgreSQL instead of MySQL
# npm install pg bcrypt
# npm install --save-dev @types/pg @types/bcrypt
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=healthbridge_db

# Security
JWT_SECRET=your_jwt_secret_key_here
BCRYPT_ROUNDS=12

# Application
NODE_ENV=development
```

## Database Setup Steps

### 1. Install MySQL Server
- Download and install MySQL Server from https://dev.mysql.com/downloads/mysql/
- Or use XAMPP/WAMP which includes MySQL

### 2. Create Database
```sql
-- Run this in your MySQL client
CREATE DATABASE healthbridge_db;
```

### 3. Run Schema Script
```bash
# Execute the schema file
mysql -u root -p healthbridge_db < database/schema.sql
```

### 4. Test Connection
After installing dependencies, you can test the database connection:

```javascript
import { testConnection } from './src/config/database.ts';
testConnection();
```

## Usage in React Components

The PatientService class provides methods to:
- Register new patients
- Login existing patients  
- Update patient information
- Retrieve patient data
- Search patients by village

Example usage:
```javascript
import { PatientService } from './src/services/patientService';
import { pool } from './src/config/database';

const patientService = new PatientService(pool);

// Register patient
const result = await patientService.registerPatient(patientData);

// Login patient
const loginResult = await patientService.loginPatient(credentials);
```

## Security Features

- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ SQL injection protection with prepared statements
- ✅ Unique email validation
- ✅ Medical record number generation
- ✅ Connection pooling for performance
- ✅ Input validation and sanitization

## Database Features

- ✅ Patient registration storage
- ✅ Secure password storage
- ✅ Medical record number generation
- ✅ Multi-language support
- ✅ Emergency contact information
- ✅ Village-based patient tracking
- ✅ Account status management
- ✅ Login tracking
- ✅ Future-ready tables for appointments and prescriptions

## Next Steps

1. Install the dependencies listed above
2. Set up MySQL database
3. Create the `.env` file
4. Run the schema script
5. Update the PatientRegistration component to use the service
6. Add error handling and success messages