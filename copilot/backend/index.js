require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_this';
const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);

function validateEmail(email) {
  return typeof email === 'string' && /@/.test(email);
}

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email) || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Invalid email or password (min 6 chars).' });
    }

    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (row) return res.status(409).json({ error: 'User already exists' });

      const hash = await bcrypt.hash(password, 10);
      const createdAt = new Date().toISOString();
      db.run(
        'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)',
        [email, hash, createdAt],
        function (err) {
          if (err) return res.status(500).json({ error: 'Insert failed' });
          res.status(201).json({ id: this.lastID, email, created_at: createdAt });
        }
      );
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!validateEmail(email) || typeof password !== 'string') return res.status(400).json({ error: 'Invalid credentials' });

  db.get('SELECT id, email, password_hash FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing authorization' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Malformed authorization' });
  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

app.get('/me', authMiddleware, (req, res) => {
  const id = req.user && req.user.id;
  if (!id) return res.status(400).json({ error: 'Bad request' });
  db.get('SELECT id, email, created_at FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json({ user: row });
  });
});

app.listen(PORT, () => {
  console.log(`Auth backend running on http://localhost:${PORT}`);
});
