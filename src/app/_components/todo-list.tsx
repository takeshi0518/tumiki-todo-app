import { getTodos } from '@/lib/todos';
import { TodoItem } from './todo-item';

export async function TodoList() {
  const todos = await getTodos();

  if (todos.length === 0) {
    return <p className="text-gray-500">Todo はまだありません。</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
