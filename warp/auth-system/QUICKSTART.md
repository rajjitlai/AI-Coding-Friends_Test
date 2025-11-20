# Quick Start Guide

## 🚀 Start the Application (Windows)

### Option 1: Automatic Start (Recommended)
```powershell
.\start.ps1
```
This will open two terminal windows - one for backend and one for frontend.

### Option 2: Manual Start
**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📋 Quick Test Flow

1. Open http://localhost:5173
2. Click "Register here"
3. Enter:
   - Email: `test@example.com`
   - Password: `password123` (min 6 chars)
4. Click "Register" → You'll be redirected to Dashboard
5. See your user info displayed
6. Click "Logout" to test login flow
7. Login with same credentials

## 🔧 Common Commands

### Backend
```powershell
cd backend
npm start          # Start server
npm run dev        # Start with auto-reload
```

### Frontend
```powershell
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🐛 Troubleshooting

**Port already in use:**
- Backend (3000): Check if another app is using port 3000
- Frontend (5173): Check if another Vite app is running

**Dependencies missing:**
```powershell
cd backend && npm install
cd ../frontend && npm install
```

**Database issues:**
Delete `backend/sqlite.db` and restart backend - it will recreate automatically.

## 📝 Environment Variables (Optional)

Create `backend/.env`:
```env
PORT=3000
JWT_SECRET=your-super-secret-key
NODE_ENV=development
```

## 🎯 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check API endpoints in README for testing with Postman/curl
- Explore extension ideas for adding features

## 📊 Project Structure

```
auth-system/
├── backend/          # Express API server
│   ├── src/         # Source code
│   └── sqlite.db    # Database file
├── frontend/        # React application  
│   └── src/         # Source code
├── README.md        # Full documentation
├── start.ps1        # Quick start script
└── .gitignore       # Git ignore rules
```

## 🔐 Default Credentials

No default users - you must register to create your first account!

## ❓ Need Help?

Check the comprehensive [README.md](README.md) file for:
- Architecture decisions
- Security features
- API documentation
- Production deployment guide
- Extension ideas
