import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'todos.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create todos table
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const todoDb = {
  // Get all todos
  getAll: () => {
    const stmt = db.prepare('SELECT * FROM todos ORDER BY created_at DESC');
    return stmt.all() as Todo[];
  },

  // Get todo by id
  getById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
    return stmt.get(id) as Todo | undefined;
  },

  // Create new todo
  create: (title: string) => {
    const stmt = db.prepare('INSERT INTO todos (title) VALUES (?)');
    const result = stmt.run(title);
    return result.lastInsertRowid as number;
  },

  // Update todo
  update: (id: number, data: Partial<Pick<Todo, 'title' | 'completed'>>) => {
    const fields = [];
    const values = [];
    
    if (data.title !== undefined) {
      fields.push('title = ?');
      values.push(data.title);
    }
    
    if (data.completed !== undefined) {
      fields.push('completed = ?');
      values.push(data.completed ? 1 : 0);
    }
    
    if (fields.length === 0) return false;
    
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = db.prepare(`UPDATE todos SET ${fields.join(', ')} WHERE id = ?`);
    const result = stmt.run(...values);
    return result.changes > 0;
  },

  // Delete todo
  delete: (id: number) => {
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
};

export default db;