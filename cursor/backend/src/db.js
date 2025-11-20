import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'sqlite.db');

const SQL = await initSqlJs({
  locateFile: (file) => path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', file),
});

const dbFileExists = fs.existsSync(dbPath);
const db = dbFileExists ? new SQL.Database(fs.readFileSync(dbPath)) : new SQL.Database();

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

function persist() {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

if (!dbFileExists) {
  persist();
}

export function get(query, params = []) {
  const stmt = db.prepare(query);
  stmt.bind(params);
  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return row;
}

export function all(query, params = []) {
  const stmt = db.prepare(query);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export function run(query, params = []) {
  const stmt = db.prepare(query);
  stmt.run(params);
  stmt.free();
  persist();
  const result = db.exec('SELECT last_insert_rowid() as id;');
  const id = result?.[0]?.values?.[0]?.[0];
  return { lastID: id };
}

export function loadUserByEmail(email) {
  return get('SELECT * FROM users WHERE email = ?', [email]);
}

export function insertUser({ email, passwordHash }) {
  run('INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)', [
    email,
    passwordHash,
  ]);
  return loadUserByEmail(email);
}

