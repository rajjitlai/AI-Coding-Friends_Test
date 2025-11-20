import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const db = new sqlite3.Database('./sqlite.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
});

// Promisify database methods for async/await usage
// Custom wrapper for db.run to preserve 'this' context with lastID
db.runAsync = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this); // 'this' contains lastID, changes, etc.
    });
  });
};
db.getAsync = promisify(db.get.bind(db));
db.allAsync = promisify(db.all.bind(db));

// Initialize database schema
const initDatabase = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await db.runAsync(createUsersTable);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err.message);
    process.exit(1);
  }
};

export { db, initDatabase };
