# Auth Backend (minimal)

Run steps:

1. cd backend
2. npm install
3. npm start

The server listens on `http://localhost:4000` by default and creates `sqlite.db` automatically.

Design notes:
- Uses JWT for stateless auth (simple for SPAs). For production, prefer httpOnly cookies.
- Passwords hashed with `bcrypt`.
- SQLite file `sqlite.db` lives in the backend folder.
