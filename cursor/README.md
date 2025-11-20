## Minimal Auth Stack

This project delivers a lightweight full-stack authentication example featuring:

- Node.js + Express API with JWT auth
- File-backed SQLite database (`sqlite.db`) managed via `sql.js`
- React + Vite frontend with React Router, contextual auth state, and guarded routes

Everything is intentionally small so you can understand every layer and extend it quickly.

---

### Design Highlights

- **JWT over sessions:** The API is stateless, so JSON Web Tokens make it easy to scale horizontally or swap clients without sticky sessions. Tokens are signed with `JWT_SECRET` and expire based on `JWT_EXPIRY` (default `1h`).
- **SQLite persistence:** `sql.js` runs SQLite in-process and writes the database back to `sqlite.db` after every mutating query. That keeps deployment simple while still meeting the “local SQLite file” requirement.
- **Input validation:** `zod` schemas verify payloads for `/register` and `/login`, returning structured errors.
- **Password security:** Passwords are hashed with `bcryptjs` (10 salt rounds). Only hashes ever touch the database.
- **Frontend routing guard:** React Router wraps protected screens in a `ProtectedRoute`, and the auth context refreshes the `/me` endpoint on load to keep state in sync with the backend.

---

### Project Structure

```
backend/
  env.sample              # Copy to .env before running
  sqlite.db               # Created automatically on first run
  src/
    db.js                 # Loads/persists SQLite and helper query functions
    index.js              # Express server + routes
frontend/
  env.sample              # Copy to .env for custom API base
  src/
    App.jsx               # Router + route guards
    pages/*.jsx           # Login, Register, Dashboard UIs
    state/AuthContext.jsx # Auth state + API helpers
```

---

### Backend Setup

```bash
cd backend
cp env.sample .env            # provide PORT, JWT secret, etc.
npm install
npm run dev                   # starts http://localhost:4000 with nodemon
```

Key endpoints:

- `POST /register` `{ email, password }`
- `POST /login` `{ email, password }`
- `GET /me` with `Authorization: Bearer <token>`

All responses include either an error payload or `{ user, token } / { user }`.

---

### Frontend Setup

```bash
cd frontend
cp env.sample .env            # set VITE_API_URL if backend differs
npm install
npm run dev                   # launches http://localhost:5173
```

Pages:

- `/login` – existing users authenticate
- `/register` – create a new account
- `/dashboard` – protected view showing `/me` data (redirects unauthenticated users)

Tokens live in `localStorage` and are sent as bearer headers; logging out simply clears the token.

---

### Extending the Stack

- Add refresh tokens or rotate JWT secrets for stricter security.
- Swap `sql.js` with `better-sqlite3` or a hosted relational DB if you need concurrent writes.
- Expand the schema with user profiles, roles, or audit tables; everything’s in one place in `db.js`.
- Wire up automated tests with Vitest/Supertest for confidence as the app grows.

Enjoy hacking on it! Feel free to adapt the pieces you need.

