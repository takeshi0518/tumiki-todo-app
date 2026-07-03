import type { Todo } from '@/lib/todos';

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2 py-2">
      <input type="checkbox" checked={todo.completed} readOnly />
      <span className={todo.completed ? 'line-through text-gray-400' : ''}>
        {todo.title}
      </span>
    </li>
  );
}
