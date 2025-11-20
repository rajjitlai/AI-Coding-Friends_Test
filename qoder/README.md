# Minimal Full-Stack Authentication System

A simple, lightweight authentication system with Node.js/Express backend and React frontend.

## Design Decisions

### Backend Architecture
- **Express.js**: Chosen for its simplicity and widespread adoption in Node.js applications
- **SQLite**: Used for local storage as it requires no separate database server and is perfect for small applications
- **JWT (JSON Web Tokens)**: Selected over sessions because:
  - Stateless authentication (scales better)
  - Works seamlessly with REST APIs
  - Easier to implement cross-domain authentication
  - More suitable for modern SPA applications
- **bcrypt**: Industry-standard library for password hashing with salting
- **Input Validation**: Custom middleware for validating registration and login inputs

### Frontend Architecture
- **React**: Modern UI library for building interactive user interfaces
- **React Router**: Standard routing solution for single-page applications
- **Context API**: Used for state management instead of external libraries like Redux for simplicity
- **Axios**: HTTP client for making API requests
- **localStorage**: Used to persist JWT tokens between page reloads

### Security Considerations
- Passwords are hashed using bcrypt with a cost factor of 10
- JWT tokens are signed with a secret key and have a 24-hour expiration
- Input validation on both client and server sides
- Protected routes that redirect unauthenticated users
- CORS enabled for development

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # Authentication context
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
├── database.js             # SQLite database operations
├── server.js               # Express server
├── package.json            # Backend dependencies
└── .env                    # Environment variables
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Install backend dependencies:
```bash
npm install
```

2. Create a `.env` file with your configuration:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
```

3. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

## API Endpoints

### POST /register
Register a new user
- Request body: `{ "email": "user@example.com", "password": "password123" }`
- Response: `{ "message": "User registered successfully", "user": {...}, "token": "jwt-token" }`

### POST /login
Authenticate a user
- Request body: `{ "email": "user@example.com", "password": "password123" }`
- Response: `{ "message": "Login successful", "user": {...}, "token": "jwt-token" }`

### GET /me
Get current authenticated user information
- Headers: `Authorization: Bearer jwt-token`
- Response: `{ "id": 1, "email": "user@example.com", "created_at": "..." }`

## Features

- User registration with email/password
- User login with JWT token generation
- Protected dashboard route
- Automatic redirect for authenticated/unauthenticated users
- Responsive UI with modern styling
- Form validation and error handling
- Persistent login state using localStorage

## Extending the System

This authentication system is designed to be easily extensible:

1. **Add more user fields**: Modify the database schema and registration form
2. **Implement role-based access control**: Add roles column to users table and check in middleware
3. **Add password reset functionality**: Implement forgot password and reset endpoints
4. **Add email verification**: Store email verification status and send verification emails
5. **Switch to PostgreSQL/MongoDB**: Replace SQLite with a production database
6. **Add refresh tokens**: Implement refresh token rotation for better security

## License

MIT