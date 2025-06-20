'use client';

import { useState } from 'react';
import { Todo } from '@/lib/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, data: Partial<Pick<Todo, 'title' | 'completed'>>) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export default function TodoItem({ todo, onUpdate, onDelete, isLoading = false }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle.trim() !== todo.title) {
      onUpdate(todo.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleDelete = () => {
    if (window.confirm('このTODOを削除しますか？')) {
      onDelete(todo.id);
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 border rounded-lg ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={isLoading}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSaveEdit}
            disabled={isLoading}
            className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            保存
          </button>
          <button
            onClick={handleCancelEdit}
            disabled={isLoading}
            className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            キャンセル
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 cursor-pointer ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
            onClick={handleToggleComplete}
          >
            {todo.title}
          </span>
          <div className="flex gap-1">
            <button
              onClick={handleEdit}
              disabled={isLoading}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              編集
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              削除
            </button>
          </div>
        </>
      )}
    </div>
  );
}