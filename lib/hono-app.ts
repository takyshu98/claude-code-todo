import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { todoDb, Todo } from './db.js';

const app = new Hono();

// Enable CORS for Next.js frontend
app.use('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Get all todos
app.get('/api/todos', (c) => {
  try {
    const todos = todoDb.getAll();
    return c.json(todos);
  } catch (error) {
    return c.json({ error: 'Failed to fetch todos' }, 500);
  }
});

// Get todo by id
app.get('/api/todos/:id', (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid todo ID' }, 400);
    }
    
    const todo = todoDb.getById(id);
    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404);
    }
    
    return c.json(todo);
  } catch (error) {
    return c.json({ error: 'Failed to fetch todo' }, 500);
  }
});

// Create new todo
app.post('/api/todos', async (c) => {
  try {
    const body = await c.req.json();
    
    if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
      return c.json({ error: 'Title is required' }, 400);
    }
    
    const id = todoDb.create(body.title.trim());
    const newTodo = todoDb.getById(id as number);
    
    return c.json(newTodo, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create todo' }, 500);
  }
});

// Update todo
app.put('/api/todos/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid todo ID' }, 400);
    }
    
    const body = await c.req.json();
    const updateData: Partial<Pick<Todo, 'title' | 'completed'>> = {};
    
    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || body.title.trim() === '') {
        return c.json({ error: 'Title must be a non-empty string' }, 400);
      }
      updateData.title = body.title.trim();
    }
    
    if (body.completed !== undefined) {
      if (typeof body.completed !== 'boolean') {
        return c.json({ error: 'Completed must be a boolean' }, 400);
      }
      updateData.completed = body.completed;
    }
    
    const success = todoDb.update(id, updateData);
    if (!success) {
      return c.json({ error: 'Todo not found' }, 404);
    }
    
    const updatedTodo = todoDb.getById(id);
    return c.json(updatedTodo);
  } catch (error) {
    return c.json({ error: 'Failed to update todo' }, 500);
  }
});

// Delete todo
app.delete('/api/todos/:id', (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid todo ID' }, 400);
    }
    
    const success = todoDb.delete(id);
    if (!success) {
      return c.json({ error: 'Todo not found' }, 404);
    }
    
    return c.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete todo' }, 500);
  }
});

export default app;