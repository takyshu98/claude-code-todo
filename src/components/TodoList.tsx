'use client';

import { useState, useEffect } from 'react';
import { Todo, todoApi } from '@/lib/api';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await todoApi.getAll();
      setTodos(todosData);
    } catch (err) {
      setError('TODOの読み込みに失敗しました');
      console.error('Failed to load todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (title: string) => {
    try {
      const newTodo = await todoApi.create(title);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError('TODOの作成に失敗しました');
      console.error('Failed to create todo:', err);
    }
  };

  const handleUpdateTodo = async (id: number, data: Partial<Pick<Todo, 'title' | 'completed'>>) => {
    try {
      const updatedTodo = await todoApi.update(id, data);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('TODOの更新に失敗しました');
      console.error('Failed to update todo:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('TODOの削除に失敗しました');
      console.error('Failed to delete todo:', err);
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">TODO管理</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <TodoForm onSubmit={handleCreateTodo} />

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          すべて ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded ${
            filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          未完了 ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          完了済み ({completedCount})
        </button>
      </div>

      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {filter === 'all' ? 'TODOがありません' : 
             filter === 'active' ? '未完了のTODOがありません' : 
             '完了済みのTODOがありません'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}