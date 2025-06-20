export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = 'http://localhost:3002/api';

export const todoApi = {
  // Get all todos
  getAll: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  // Get todo by id
  getById: async (id: number): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    return response.json();
  },

  // Create new todo
  create: async (title: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  // Update todo
  update: async (id: number, data: Partial<Pick<Todo, 'title' | 'completed'>>): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },

  // Delete todo
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
};