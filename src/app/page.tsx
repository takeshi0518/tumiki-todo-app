import { getTodos } from '@/lib/todos';
import { TodoList } from './_components/todo-list';

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <div className="mt-6">
        <TodoList todos={todos} />
      </div>
    </div>
  );
}
