# FocusHub

FocusHub is a full-stack productivity app with authentication and a Kanban-style board for managing tasks across To Do, In Progress, and Done columns.

## Stack

Frontend:
- React 19
- Vite 7
- Tailwind CSS 4
- React Router 7
- Radix UI

Backend:
- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose
- JWT authentication

## Monorepo Structure

```
FocusHub/
├── frontend/   # React app
└── backend/    # Express API (TypeScript)
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas URI (or local MongoDB)

## Local Setup

### 1) Backend

From `backend`:

```bash
npm install
```

Create `backend/.env`:

```env
PORT=3000
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net
JWT_SECRET_KEY=<your_secret_here>
```

Run development server:

```bash
npm run dev
```

Build + run production build:

```bash
npm run build
npm start
```

### 2) Frontend

From `frontend`:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Available Scripts

Backend (`backend/package.json`):
- `npm run dev` -> runs `src/index.ts` with ts-node
- `npm run build` -> compiles TypeScript to `dist/`
- `npm start` -> runs `dist/index.js`

Frontend (`frontend/package.json`):
- `npm run dev` -> starts Vite dev server
- `npm run build` -> builds for production
- `npm run lint` -> runs ESLint
- `npm run preview` -> previews production build

## Backend API Routes

Authentication and profile:
- `POST /register`
- `POST /login`
- `PUT /me` (auth required)

Board and tasks:
- `GET /board` (auth required)
- `POST /tasks` (auth required)
- `PATCH /tasks/:id` (auth required)
- `PATCH /tasks/:id/move` (auth required)
- `DELETE /tasks/:id` (auth required)

Health:
- `GET /`

## Deployment

### Backend on Render

Use these settings:
- Root Directory: `backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

If you see this error:

`Cannot find module '/opt/render/project/src/index.js'`

it means Render is running from the wrong directory or using the wrong start command.

### Frontend Hosting

Deploy `frontend` to Vercel, Netlify, or Render static hosting.

Build settings:
- Root Directory: `frontend`
- Build Command: `npm run build`
- Publish Directory: `dist`

## Important Note

Frontend currently uses hardcoded `http://localhost:3000` API URLs in several files. For production, switch to an environment-based API base URL (for example, `VITE_API_BASE_URL`) and consume it in one shared config.

## Next Improvements

- Move frontend API URL configuration to environment variables.
- Add centralized API client for consistent error handling.
- Add test coverage for auth and task endpoints.
- Add a root `LICENSE` file for project-wide licensing clarity.
