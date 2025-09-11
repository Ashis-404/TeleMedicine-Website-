# Combined Server Setup - HealthBridge

## Overview
The HealthBridge application now runs both the React frontend and Python Flask backend through a single combined server setup. Patient login automatically redirects to the integrated Clinical Decision Support System.

## Prerequisites
- Node.js and npm installed
- Python 3.x installed
- Required Python packages (Flask, pandas, reportlab)

## Quick Start (Recommended)

### 1. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
cd demo
pip install flask pandas reportlab
cd ..
```

### 2. Start Combined Server
```bash
npm run start-combined
```
This single command starts:
- React/Vite development server (usually port 5173/5174)
- Python Flask API server (port 5000)
- Automatic proxying between the two

### 3. Access the Application
- **Main Application**: http://localhost:5173 (or displayed port)
- **Patient Dashboard**: Automatically accessible via `/demo` route after login
- **Direct Flask Access**: http://localhost:5000 (for debugging)

## Alternative Setup Methods

### Manual Setup (Two Terminals)
If you prefer to run servers separately:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run demo
# or manually: cd demo && python app.py
```

## Patient Login Flow
1. Go to the main application
2. Click "Sign In"
3. Enter patient credentials (email and password)
4. **Automatic redirect** to integrated Clinical Decision Support System
5. No manual server startup required!

## Technical Details

### Vite Proxy Configuration
The Vite development server now proxies Flask routes:
- `/demo/*` → Flask server
- `/api/*` → Flask server  
- `/symptoms`, `/assess`, `/health` → Flask server

### Benefits of Combined Setup
- ✅ Single command startup
- ✅ Seamless patient dashboard integration
- ✅ No manual Flask server management
- ✅ Automatic port handling
- ✅ Unified development experience

## Patient Test Credentials
Use any registered patient email and password, or register a new patient account.

## Flask Demo Features
- Clinical Decision Support System
- Symptom assessment
- Medication recommendations (OTC only)
- PDF report generation
- Multi-language support (English/Hindi)

## Troubleshooting
- **Port conflicts**: The combined server automatically handles port selection
- **Python issues**: Ensure Python is in PATH and dependencies are installed
- **Flask not starting**: Check demo folder has all required files (app.py, main_data.csv)
- **Proxy issues**: Restart the combined server if Flask routes aren't working

## Available Scripts
- `npm run start-combined` - Start both servers (recommended)
- `npm run full-server` - Alias for start-combined  
- `npm run dev` - Start only Vite server
- `npm run demo` - Start only Flask server