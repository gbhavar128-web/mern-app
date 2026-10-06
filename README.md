# MERN E-Commerce - Shoes

A complete beginner-friendly MERN e-commerce project.

## Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt authentication
- Bootstrap Icons

## Folder structure
mern-ecommerce/
  client/
  server/
  package.json

## Setup

1. Install Node.js and MongoDB (or use MongoDB Atlas).
2. From the project root:

```powershell
npm install
npm run install-all
```

3. Create `server/.env` by copying `server/.env.example` and set `MONGO_URI` and `JWT_SECRET`.

PowerShell:
```powershell
Copy-Item server/.env.example server/.env
```

4. Seed products:
```powershell
npm run seed
```

5. Start frontend and backend together:
```powershell
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000
Health check: http://localhost:5000/api/health

## Important
Do not run `install npm`. The correct command is `npm install`.

Do not run `npm run dev` from inside `client` if you want both servers. Run it from the root.
