import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { db, initDatabase } from './db.js';
import { generateToken, verifyToken } from './auth.js';
import { registerValidation, loginValidation, validate } from './validation.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * POST /register
 * Register a new user
 */
app.post('/register', registerValidation, validate, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await db.getAsync('SELECT id FROM users WHERE email = ?', [email]);
  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  // Hash password (10 rounds)
  const password_hash = await bcrypt.hash(password, 10);

  // Insert user
  const result = await db.runAsync(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, password_hash]
  );

  // Generate JWT
  const token = generateToken(result.lastID, email);

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: result.lastID,
      email
    }
  });
}));

/**
 * POST /login
 * Authenticate user and return JWT
 */
app.post('/login', loginValidation, validate, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await db.getAsync('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT
  const token = generateToken(user.id, user.email);

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
}));

/**
 * GET /me
 * Get current user info (protected route)
 */
app.get('/me', verifyToken, asyncHandler(async (req, res) => {
  // req.user is set by verifyToken middleware
  const user = await db.getAsync(
    'SELECT id, email, created_at FROM users WHERE id = ?',
    [req.user.userId]
  );

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
}));

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

/**
 * Initialize database and start server
 */
const startServer = async () => {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
