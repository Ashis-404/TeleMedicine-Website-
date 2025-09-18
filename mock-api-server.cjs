const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database (in-memory storage for testing)
const mockUsers = [];
let userIdCounter = 1;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    ok: true, 
    message: "TeleMedicine API Server is running",
    timestamp: new Date().toISOString(),
    environment: 'development-mock'
  });
});

// Patient login endpoint
app.post('/api/auth/login/patient', (req, res) => {
  const { phone } = req.body;
  
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Find or create mock patient
  let user = mockUsers.find(u => u.phone === phone && u.role === 'patient');
  
  if (!user) {
    // Auto-create patient for testing
    user = {
      id: userIdCounter++,
      role: 'patient',
      phone: phone,
      email: `patient${userIdCounter}@example.com`,
      name: `Patient ${userIdCounter}`
    };
    mockUsers.push(user);
  }

  // Generate mock JWT token
  const token = `mock-jwt-token-${user.id}-${Date.now()}`;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      role: user.role,
      phone: user.phone,
      email: user.email,
      name: user.name
    }
  });
});

// Doctor login endpoint
app.post('/api/auth/login/doctor', (req, res) => {
  const { identifier, password } = req.body;
  
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/Employee ID and password are required' });
  }

  // Mock doctor login (accept any credentials for testing)
  const user = {
    id: userIdCounter++,
    role: 'doctor',
    phone: '+1234567890',
    email: identifier,
    name: 'Dr. Test Doctor'
  };

  const token = `mock-jwt-token-${user.id}-${Date.now()}`;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user
  });
});

// Health worker login endpoint
app.post('/api/auth/login/healthworker', (req, res) => {
  const { identifier, password } = req.body;
  
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/Employee ID and password are required' });
  }

  // Mock health worker login (accept any credentials for testing)
  const user = {
    id: userIdCounter++,
    role: 'healthworker',
    phone: '+1234567890',
    email: identifier,
    name: 'Test Health Worker'
  };

  const token = `mock-jwt-token-${user.id}-${Date.now()}`;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user
  });
});

// Patient registration endpoint
app.post('/api/auth/register/patient', (req, res) => {
  const { name, phone, age, gender, village } = req.body;
  
  if (!name || !phone || !age || !gender || !village) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = {
    id: userIdCounter++,
    role: 'patient',
    phone,
    email: `patient${userIdCounter}@example.com`,
    name
  };

  mockUsers.push(user);
  const token = `mock-jwt-token-${user.id}-${Date.now()}`;

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    token,
    user
  });
});

// Profile endpoint
app.get('/api/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Mock profile response
  res.status(200).json({
    success: true,
    profile: {
      user_id: 1,
      name: 'Test Patient',
      age: 30,
      gender: 'male',
      village: 'Test Village',
      district: 'Test District',
      medical_record_number: 'PAT001'
    },
    user: {
      id: 1,
      role: 'patient',
      phone: '+1234567890',
      email: 'test@example.com'
    }
  });
});

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    available_endpoints: [
      'GET /api/health',
      'GET /api/me',
      'POST /api/auth/login/patient',
      'POST /api/auth/login/doctor',
      'POST /api/auth/login/healthworker',
      'POST /api/auth/register/patient'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/me`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login/patient`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login/doctor`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login/healthworker`);
  console.log(`   POST http://localhost:${PORT}/api/auth/register/patient`);
  console.log('\n✨ Ready for testing!');
});

module.exports = app;