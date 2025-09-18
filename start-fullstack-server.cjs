#!/usr/bin/env node
// start-backend-server.cjs - Start the Node.js/Express backend server

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting TeleMedicine Backend Server...\n');

// Start Express API server
function startBackend() {
  console.log('🔧 Starting Express API server on port 4000...');
  
  const backendProcess = spawn('npx', ['ts-node-dev', '--esm', 'src/server.ts'], {
    stdio: 'inherit',
    shell: true
  });

  backendProcess.on('error', (error) => {
    console.error('❌ Failed to start backend server:', error.message);
    console.log('📝 Make sure dependencies are installed: npm install');
  });

  return backendProcess;
}

// Start Vite frontend server
function startFrontend() {
  console.log('⚡ Starting Vite frontend server...');
  
  const frontendProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  frontendProcess.on('error', (error) => {
    console.error('❌ Failed to start frontend server:', error.message);
    console.log('📝 Make sure dependencies are installed: npm install');
  });

  return frontendProcess;
}

// Start both servers
function startServers() {
  const backendProcess = startBackend();
  
  // Wait a bit for backend to start
  setTimeout(() => {
    const frontendProcess = startFrontend();
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down servers...');
      backendProcess.kill('SIGINT');
      frontendProcess.kill('SIGINT');
      process.exit(0);
    });
    
    console.log('\n✅ Both servers are starting...');
    console.log('📋 Access points:');
    console.log('   🌐 Frontend: http://localhost:5173 (or next available port)');
    console.log('   🔧 Backend API: http://localhost:4000');
    console.log('   🔐 Auth Endpoints: http://localhost:4000/api/auth/*');
    console.log('   🏥 Health Check: http://localhost:4000/api/health');
    
  }, 2000);
}

startServers().catch(console.error);