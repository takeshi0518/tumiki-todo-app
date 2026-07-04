'use client';

import { useState } from 'react';

type TodoFormProps = {
  onAdd: (title: string) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed === '') return;
    onAdd(trimmed);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいTodoを入力"
        className="border rounded px-2 py-1 flex-1"
      />
      <button type="submit" className="border rounded px-3 py-1">
        追加
      </button>
    </form>
  );
}
