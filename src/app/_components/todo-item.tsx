"use client";

import { useTransition } from "react";
import type { Todo } from "@/lib/todos";
import { toggleTodoAction } from "../_actions/todo-actions";

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <li className="flex items-center gap-2 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        disabled={isPending}
        onChange={() => startTransition(() => toggleTodoAction(todo.id))}
      />
      <span className={todo.completed ? "line-through text-gray-400" : ""}>
        {todo.title}
      </span>
    </li>
  );
}
