# Full-Stack Authentication System

A minimal, production-ready authentication system built with Node.js, Express, SQLite, and React.

## 🏗️ Architecture Overview

### Backend (Node.js + Express)
- **Framework**: Express.js for REST API
- **Database**: SQLite with automatic schema initialization
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt with 10 rounds
- **Validation**: express-validator for input sanitization

### Frontend (React)
- **Framework**: React 18 with Vite
- **Routing**: React Router v6 with protected routes
- **HTTP Client**: Axios with interceptors
- **Styling**: Modern CSS with gradient design

## 📁 Project Structure

```
auth-system/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express app and REST endpoints
│   │   ├── db.js              # SQLite connection and initialization
│   │   ├── auth.js            # JWT utilities and middleware
│   │   └── validation.js      # Input validation rules
│   ├── package.json
│   └── sqlite.db              # Auto-generated database file
└── frontend/
    ├── src/
    │   ├── App.jsx            # Router setup
    │   ├── main.jsx           # React entry point
    │   ├── api.js             # API client with auth
    │   ├── pages/
    │   │   ├── Login.jsx      # Login page
    │   │   ├── Register.jsx   # Registration page
    │   │   ├── Dashboard.jsx  # Protected dashboard
    │   │   ├── Auth.css       # Auth pages styling
    │   │   └── Dashboard.css  # Dashboard styling
    │   └── components/
    │       └── PrivateRoute.jsx  # Route protection wrapper
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔐 Design Decisions

### Why JWT over Session-Based Auth?

**JWT (Token-Based) Advantages:**
- ✅ **Stateless**: No server-side session storage required
- ✅ **Scalability**: Easy horizontal scaling without shared session store
- ✅ **Decoupled Architecture**: Frontend and backend can be deployed independently
- ✅ **Mobile-Friendly**: Same token can be used for web and mobile apps
- ✅ **Cross-Domain**: Works seamlessly across different domains

**Trade-offs:**
- ❌ Cannot invalidate tokens server-side without additional infrastructure (Redis blacklist)
- ❌ Token size is larger than session IDs
- ❌ Token cannot be updated without re-authentication

**Conclusion**: For this minimal implementation, JWT provides the best balance of simplicity, security, and scalability.

### Why bcrypt over argon2?

**bcrypt Advantages:**
- ✅ Battle-tested since 1999
- ✅ Excellent Node.js library support
- ✅ Automatic salt generation
- ✅ Adjustable work factor (10 rounds = ~100ms hashing time)

**argon2 Advantages:**
- ✅ Winner of Password Hashing Competition (2015)
- ✅ Better resistance to GPU/ASIC attacks
- ✅ More modern algorithm

**Conclusion**: For this project, bcrypt provides sufficient security with excellent ecosystem support. argon2 would be preferred for high-security applications.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd auth-system
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Start Backend (Terminal 1)
```bash
cd backend
npm start
```
Backend runs on: `http://localhost:3000`

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Development Mode

Backend with auto-reload:
```bash
cd backend
npm run dev
```

## 📡 API Endpoints

### POST `/register`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Validation:**
- Email must be valid format
- Password must be at least 6 characters

### POST `/login`
Authenticate a user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### GET `/me`
Get current user information (protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2024-01-01 12:00:00"
  }
}
```

## 🔒 Security Features

1. **Password Hashing**: bcrypt with 10 rounds (computational cost: ~100ms)
2. **JWT Expiration**: 24 hour token lifetime
3. **Input Validation**: Email format and password length checks
4. **SQL Injection Prevention**: Parameterized queries
5. **CORS**: Enabled for frontend-backend communication
6. **Error Handling**: Generic error messages to prevent information leakage

## 🎨 Frontend Features

1. **Modern UI**: Gradient design with smooth animations
2. **Protected Routes**: Automatic redirect for unauthenticated users
3. **Token Management**: Automatic JWT inclusion in API requests
4. **Error Handling**: User-friendly error messages
5. **Loading States**: Visual feedback during API calls
6. **Responsive Design**: Mobile-friendly layout

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory (optional):

```env
PORT=3000
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
```

**Important**: Always use a strong, random JWT secret in production!

### Database Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Database file: `backend/sqlite.db` (auto-created on first run)

## 🧪 Testing the System

1. Start both backend and frontend
2. Navigate to `http://localhost:5173`
3. Click "Register here" to create a new account
4. Enter email and password (min 6 characters)
5. After successful registration, you'll be redirected to the dashboard
6. Click "Logout" to test login functionality
7. Try accessing `/dashboard` without login - you'll be redirected to login

## 🚀 Production Deployment

### Backend
1. Set `JWT_SECRET` environment variable
2. Set `NODE_ENV=production`
3. Consider using PostgreSQL instead of SQLite
4. Add rate limiting (e.g., express-rate-limit)
5. Add HTTPS/TLS
6. Implement token refresh mechanism
7. Add logging (e.g., Winston)

### Frontend
1. Build production bundle: `npm run build`
2. Serve `dist/` folder with web server (Nginx, Apache, etc.)
3. Update `API_URL` in `api.js` to production backend URL
4. Consider using environment variables for API URL

## 📦 Dependencies

### Backend
- **express**: Web framework
- **sqlite3**: Database driver
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT generation and verification
- **cors**: Cross-origin resource sharing
- **express-validator**: Input validation

### Frontend
- **react**: UI framework
- **react-dom**: React DOM renderer
- **react-router-dom**: Routing
- **axios**: HTTP client
- **vite**: Build tool

## 🛠️ Extension Ideas

1. **Email Verification**: Send confirmation emails on registration
2. **Password Reset**: Implement forgot password flow
3. **OAuth Integration**: Add Google/GitHub login
4. **Refresh Tokens**: Implement token refresh mechanism
5. **Rate Limiting**: Prevent brute force attacks
6. **2FA**: Add two-factor authentication
7. **User Profiles**: Extended user information and settings
8. **Session Management**: View and revoke active sessions

## 📄 License

MIT

## 👤 Author

Built as a minimal, educational full-stack authentication system.
