"use client";

import { useOptimistic, useTransition } from "react";
import type { Todo } from "@/lib/todos";
import { toggleTodoAction } from "../_actions/todo-actions";
import { TodoItem } from "./todo-item";

type TodoListProps = {
  todos: Todo[];
};

export function TodoList({ todos }: TodoListProps) {
  const [optimisticTodos, setOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, toggledId: string) =>
      currentTodos.map((todo) =>
        todo.id === toggledId
          ? { ...todo, completed: !todo.completed }
          : todo
      )
  );
  const [, startTransition] = useTransition();

  function handleToggle(id: string) {
    startTransition(async () => {
      setOptimisticTodo(id);
      await toggleTodoAction(id);
    });
  }

  if (optimisticTodos.length === 0) {
    return <p className="text-gray-500">Todo はまだありません。</p>;
  }

  return (
    <ul>
      {optimisticTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </ul>
  );
}
