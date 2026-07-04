"use client";

import type { Todo } from "@/lib/todos";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
};

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? "line-through text-gray-400" : ""}>
        {todo.title}
      </span>
    </li>
  );
}
