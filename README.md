# Prodigy MERN Auth

This project implements secure authentication using the MERN stack with registration, login, JWT-protected API, and protected routes in React.

## Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, CORS, dotenv
- Frontend: React (Vite), React Router, Axios

## Folder Structure
PRODIGY_FSWD_01/
  server/
    src/
      models/User.js
      middleware/auth.js
      routes/authRoutes.js
      routes/protectedRoutes.js
      setup/db.js
      server.js
    package.json
  client/
    src/
      context/AuthContext.jsx
      pages/Login.jsx
      pages/Register.jsx
      pages/Dashboard.jsx
      App.jsx
      main.jsx
      styles.css
    index.html
    package.json

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

## Environment Variables
Create a .env file in server/ with:
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/prodigy_auth
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_ORIGIN=http://localhost:5173

Optionally create a .env file in client/:
VITE_API_BASE=http://localhost:5000/api

## Setup & Run
Open two terminals from the project root.

1) Backend (server)
cd server
npm install
npm run dev

2) Frontend (client)
cd client
npm install
npm run dev

## API Overview
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password } -> { token, user }
- GET /api/auth/me (Authorization: Bearer <token>) -> { user }
- GET /api/protected/profile (Authorization: Bearer <token>) -> { user }

## Notes
- Passwords are hashed with bcrypt (12 rounds).
- JWT sub holds the user id, expires in 7 days.
- Protected frontend routes redirect unauthenticated users to /login.
