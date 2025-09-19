# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Checks

### 1. **Build Test**
```bash
npm run build
```
Make sure this completes without errors.

### 2. **Environment Variables Required**
Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Database (Required for production)
DB_HOST=your-planetscale-or-mysql-host
DB_PORT=3306
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=telemedicine

# JWT Secret (Required)
JWT_SECRET=your-super-secure-random-jwt-secret-key-min-32-chars

# Node Environment
NODE_ENV=production
```

### 3. **Vercel Configuration**
✅ `vercel.json` exists and is properly configured
✅ API routes are in `/api` folder
✅ Static build configuration is set

### 4. **API Endpoints Status**
✅ `/api/health.ts` - Health check
✅ `/api/me.ts` - User profile
✅ `/api/auth/register/patient.ts` - Patient registration
✅ `/api/auth/register/doctor.ts` - Doctor registration  
✅ `/api/auth/register/healthworker.ts` - Health worker registration
✅ `/api/auth/login/patient.ts` - Patient login
✅ `/api/auth/login/doctor.ts` - Doctor login
✅ `/api/auth/login/healthworker.ts` - Health worker login

### 5. **Database Setup**
You need a MySQL database. Options:
- **PlanetScale** (recommended, free tier available)
- **Railway** 
- **DigitalOcean MySQL**
- **AWS RDS**

## 🔧 Known Issues Fixed

### ✅ API Configuration
- Development: Uses mock API at `localhost:3001`
- Production: Uses Vercel API routes at `/api`

### ✅ Dependencies
All required packages are in package.json:
- `jsonwebtoken` for JWT tokens
- `mysql2` for database
- `@vercel/node` for Vercel functions

### ✅ CORS Headers
All API routes include proper CORS headers for cross-origin requests.

## 🚀 Deployment Steps

### Option 1: Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DB_HOST
vercel env add DB_PASSWORD
vercel env add JWT_SECRET
# ... etc

# Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Add environment variables in dashboard
5. Deploy

## 🧪 Testing After Deployment

1. **Health Check**: Visit `https://your-app.vercel.app/api/health`
2. **Frontend**: Visit `https://your-app.vercel.app`
3. **Registration**: Test user registration flow
4. **Database**: Verify data is saved to your MySQL database

## 🔧 Development vs Production

### Development (Current Setup)
- Frontend: `http://localhost:5173`
- API: Mock server at `http://localhost:3001`
- Database: In-memory mock data

### Production (Vercel)
- Frontend: `https://your-app.vercel.app`
- API: Vercel serverless functions at `/api/*`
- Database: Real MySQL database

## 🚨 Common Deployment Issues

### 1. Environment Variables Missing
**Symptoms**: 500 errors on API calls
**Fix**: Add all required environment variables in Vercel dashboard

### 2. Database Connection Failed
**Symptoms**: Registration/login fails with database errors
**Fix**: 
- Verify database credentials
- Ensure database allows external connections
- Check if database exists

### 3. CORS Issues
**Symptoms**: "Failed to fetch" errors
**Fix**: All API routes already include CORS headers

### 4. Build Failures
**Symptoms**: Deployment fails during build
**Fix**: 
```bash
# Test build locally first
npm run build

# Fix any TypeScript/build errors
npm run lint
```

## 🎯 Final Recommendation

**For immediate deployment**: The project is ready for Vercel, but you need:
1. A MySQL database (PlanetScale recommended)
2. Environment variables configured
3. Database tables created

**Alternative for quick demo**: Keep using the mock API approach by modifying the production config to use a hosted mock server.