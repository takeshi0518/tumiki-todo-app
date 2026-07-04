'use client';

import { useOptimistic, useTransition } from 'react';
import type { Todo } from '@/lib/todos';
import {
  addTodoAction,
  deleteTodoAction,
  toggleTodoAction,
} from '../_actions/todo-actions';
import { TodoForm } from './todo-form';
import { TodoItem } from './todo-item';

type TodoListProps = {
  todos: Todo[];
};

type TodoAction =
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string }
  | { type: 'add'; todo: Todo };

export function TodoList({ todos }: TodoListProps) {
  const [optimisticTodos, applyOptimistic] = useOptimistic(
    todos,
    (currentTodos, action: TodoAction) => {
      switch (action.type) {
        case 'toggle':
          return currentTodos.map((todo) =>
            todo.id === action.id
              ? { ...todo, completed: !todo.completed }
              : todo
          );
        case 'delete':
          return currentTodos.filter((todo) => todo.id !== action.id);
        case 'add':
          return [...currentTodos, action.todo];
        default: {
          const _exhaustive: never = action;
          throw new Error(`不明なアクション: ${JSON.stringify(_exhaustive)}`);
        }
      }
    }
  );
  const [, startTransition] = useTransition();

  function handleToggle(id: string) {
    startTransition(async () => {
      applyOptimistic({ type: 'toggle', id });
      await toggleTodoAction(id);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      applyOptimistic({ type: 'delete', id });
      await deleteTodoAction(id);
    });
  }

  function handleAdd(title: string) {
    const optimisticTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    startTransition(async () => {
      applyOptimistic({ type: 'add', todo: optimisticTodo });
      await addTodoAction(title);
    });
  }

  return (
    <div>
      <TodoForm onAdd={handleAdd} />
      {optimisticTodos.length === 0 ? (
        <p className="mt-4 text-gray-500">Todo はまだありません。</p>
      ) : (
        <ul className="mt-4">
          {optimisticTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
