const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME';
const JWT_EXPIRES_IN = '1h';

function validateEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

app.post('/register', (req, res) => {
  const { email, password } = req.body || {};
  if (!validateEmail(email) || !validatePassword(password)) return res.status(400).json({ error: 'Invalid email or password' });
  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (row) return res.status(409).json({ error: 'Email already registered' });
    const hash = bcrypt.hashSync(password, 10);
    const createdAt = new Date().toISOString();
    db.run('INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)', [email, hash, createdAt], function (err2) {
      if (err2) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ id: this.lastID, email });
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!validateEmail(email) || !validatePassword(password)) return res.status(400).json({ error: 'Invalid email or password' });
  db.get('SELECT id, email, password_hash FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token });
  });
});

function authMiddleware(req, res, next) {
  const hdr = req.headers.authorization || '';
  const parts = hdr.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    try {
      const payload = jwt.verify(parts[1], JWT_SECRET);
      req.user = payload;
      return next();
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  return res.status(401).json({ error: 'Missing token' });
}

app.get('/me', authMiddleware, (req, res) => {
  db.get('SELECT id, email, created_at FROM users WHERE id = ?', [req.user.sub], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ id: user.id, email: user.email, created_at: user.created_at });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});