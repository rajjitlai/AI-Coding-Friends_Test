# Minimal Full-Stack Auth

This repository contains a minimal Node.js + Express backend and a Vite + React frontend demonstrating registration, login, and a protected dashboard using JWTs.

Backend: `backend/` — run `npm install` and `npm start`.
Frontend: `frontend/` — run `npm install` and `npm run dev`.

Design notes:
- Backend uses JWTs for stateless auth; simple to integrate with SPA and scales well.
- Passwords hashed with `bcrypt`.
- SQLite (`backend/sqlite.db`) stores users and is auto-initialized.
- Frontend stores the JWT in `localStorage` for simplicity; for production consider `HttpOnly` cookies for improved security.
