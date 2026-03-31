# FocusHub

A Notion/Kanban-style productivity board built with React and Node.js. Organize your work into boards with draggable columns and task cards, track progress on a dashboard, and toggle between light and dark themes.

## Features

- **Kanban Board** — Columns (To Do, In Progress, Done) with task cards you can add, edit, move, and delete
- **Task Modal** — Edit task details in a portal-based modal overlay
- **Authentication** — Register and login with email/password; protected routes redirect unauthenticated users
- **Sidebar Navigation** — Collapsible sidebar with links to Dashboard, Board, Settings, and Account
- **Dark Mode** — System, light, and dark theme support via `next-themes`
- **Local Persistence** — Board state is saved to `localStorage` via `useReducer` + `useEffect`

## Tech Stack

### Frontend

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router v7 |
| UI Components | Radix UI |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |

### Backend

| Category | Technology |
|----------|------------|
| Runtime | Node.js with Express 5 |
| Language | TypeScript |
| Database | MongoDB with Mongoose |
| Auth | bcrypt, jsonwebtoken |

## Project Structure

```
FocusHub/
├── src/                          # React frontend
│   ├── components/
│   │   ├── layout/               # SideBar, NavBar
│   │   ├── board/                # Columns, TaskCard
│   │   ├── modal/                # TaskModal (portal)
│   │   └── ui/                   # Radix-based primitives
│   ├── context/                  # AuthContext, BoardContext, ThemeContext
│   ├── pages/                    # Dashboard, BoardPage, Settings, Account, Login, Register
│   ├── reducers/                 # boardReducer
│   ├── state/                    # InitialBoardState
│   ├── hooks/                    # Custom hooks
│   ├── lib/                      # Utilities (cn)
│   ├── App.jsx
│   └── main.jsx
├── backend-node/                 # Express API
│   └── src/
│       ├── index.ts              # App entry, routes
│       ├── db/                   # MongoDB connection
│       ├── schema/               # Mongoose models (User, Column, Task)
│       └── utils/                # Input validation
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/FocusHub.git
cd FocusHub
```

### 2. Frontend setup

```bash
npm install
npm run dev
```

The frontend dev server starts at `http://localhost:5173` by default.

### 3. Backend setup

```bash
cd backend-node
npm install
```

Create a `.env` file in `backend-node/`:

```env
PORT=3000
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
```

Then start the server:

```bash
npm run dev
```

The API server starts at `http://localhost:3000`.

## Available Scripts

### Frontend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with ts-node |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled output |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/register` | Register a new user (username, email, password) |
| POST | `/login` | Authenticate a user (email, password) |

## Architecture

### State Management

- **Board state** is managed with `useReducer` in `BoardContext`, supporting actions: `ADD_TASK`, `DELETE_TASK`, `MOVE_TASK`, `UPDATE_TASK`
- **Auth state** is managed with `useState` in `AuthContext`, storing the JWT token in `localStorage`
- **Theme state** is handled by `next-themes` via `ThemeContext`

### Routing

- Auth pages (`/`, `/login`, `/register`) render without the sidebar/navbar
- Protected pages (`/dashboard`, `/board`, `/settings`, `/account`) are wrapped in a sidebar layout
- Unauthenticated users are redirected to `/login`; authenticated users on auth pages are redirected to `/dashboard`

## Roadmap

- [ ] JWT token issuance and validation on the backend
- [ ] Backend API for boards, columns, and tasks (full CRUD)
- [ ] Sync board state with the database instead of localStorage
- [ ] Drag-and-drop task reordering
- [ ] Dashboard with task statistics
- [ ] Settings and Account pages
- [ ] User profile and avatar support

## License

This project is for educational purposes.
