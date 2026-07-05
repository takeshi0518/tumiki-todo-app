import { supabase } from './supabase';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

let todos: Todo[] = [
  { id: '1', title: 'Next.js の App Router を復習する', completed: false },
  { id: '2', title: 'Todo アプリの UI を作る', completed: false },
  { id: '3', title: 'CLAUDE.md を書く', completed: true },
];

const DUMMY_LATENCY_MS = 300;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('id, title, completed, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Todoの取得に失敗しました: ${error.message}`);
  }

  return data.map(({ id, title, completed }) => ({ id, title, completed }));
}

export async function addTodo(title: string): Promise<Todo> {
  await delay(DUMMY_LATENCY_MS);
  const todo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };
  todos = [...todos, todo];
  return todo;
}

export async function toggleTodo(id: string): Promise<Todo> {
  await delay(DUMMY_LATENCY_MS);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    throw new Error(`Todo not found: ${id}`);
  }
  todo.completed = !todo.completed;
  return todo;
}

export async function deleteTodo(id: string): Promise<void> {
  await delay(DUMMY_LATENCY_MS);
  todos = todos.filter((t) => t.id !== id);
}
