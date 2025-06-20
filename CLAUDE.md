# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TODO management application built with Next.js (frontend) and Hono (backend API). The app uses SQLite for data persistence and Tailwind CSS for styling.

## Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Hono server running on port 3001
- **Database**: SQLite with better-sqlite3
- **Components**: React components with client-side state management

### Key Files

- `lib/db.ts` - Database connection and TODO operations
- `lib/hono-app.ts` - Hono API routes (CRUD operations)
- `server.ts` - Hono server entry point
- `src/lib/api.ts` - Frontend API client
- `src/components/TodoList.tsx` - Main TODO list component
- `src/components/TodoItem.tsx` - Individual TODO item component
- `src/components/TodoForm.tsx` - TODO creation form

## Development Commands

```bash
# Install dependencies
npm install

# Start Next.js development server (port 3000)
npm run dev

# Start Hono API server (port 3001)
npm run dev:server

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Running the Application

1. Start the Hono API server: `npm run dev:server`
2. In another terminal, start the Next.js frontend: `npm run dev`
3. Access the application at `http://localhost:3000`

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `GET /api/todos/:id` - Get todo by ID
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Database Schema

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Development Notes

- The database file (`todos.db`) is automatically created when the server starts
- Frontend communicates with backend via REST API calls to `http://localhost:3001`
- All components use TypeScript for type safety
- The app supports CRUD operations: Create, Read, Update, Delete TODOs