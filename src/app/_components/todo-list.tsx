"use client";

import { useOptimistic, useTransition } from "react";
import type { Todo } from "@/lib/todos";
import { deleteTodoAction, toggleTodoAction } from "../_actions/todo-actions";
import { TodoItem } from "./todo-item";

type TodoListProps = {
  todos: Todo[];
};

type TodoAction =
  | { type: "toggle"; id: string }
  | { type: "delete"; id: string };

export function TodoList({ todos }: TodoListProps) {
  const [optimisticTodos, applyOptimistic] = useOptimistic(
    todos,
    (currentTodos, action: TodoAction) => {
      switch (action.type) {
        case "toggle":
          return currentTodos.map((todo) =>
            todo.id === action.id
              ? { ...todo, completed: !todo.completed }
              : todo
          );
        case "delete":
          return currentTodos.filter((todo) => todo.id !== action.id);
        default: {
          const _exhaustive: never = action;
          throw new Error(`不明なアクション: ${JSON.stringify(action)}`);
        }
      }
    }
  );
  const [, startTransition] = useTransition();

  function handleToggle(id: string) {
    startTransition(async () => {
      applyOptimistic({ type: "toggle", id });
      await toggleTodoAction(id);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      applyOptimistic({ type: "delete", id });
      await deleteTodoAction(id);
    });
  }

  if (optimisticTodos.length === 0) {
    return <p className="text-gray-500">Todo はまだありません。</p>;
  }

  return (
    <ul>
      {optimisticTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
