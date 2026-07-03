import { TodoList } from './_components/todo-list';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <div className="mt-6">
        <TodoList />
      </div>
    </div>
  );
}
