import { supabase } from './supabase';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

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
  const { data, error } = await supabase
    .from('todos')
    .insert({ title })
    .select('id, title, completed')
    .single();

  if (error) {
    throw new Error(`Todoの追加に失敗しました: ${error.message}`);
  }

  return data;
}

export async function toggleTodo(id: string): Promise<Todo> {
  const { data: current, error: fetchError } = await supabase
    .from('todos')
    .select('completed')
    .eq('id', id)
    .single();

  if (fetchError) {
    throw new Error(`Todoの取得に失敗しました: ${fetchError.message}`);
  }

  const { data, error } = await supabase
    .from('todos')
    .update({ completed: !current.completed })
    .eq('id', id)
    .select('id, title, completed')
    .single();

  if (error) {
    throw new Error(`Todoの更新に失敗しました: ${error.message}`);
  }

  return data;
}

export async function deleteTodo(id: string): Promise<void> {
  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) {
    throw new Error(`Todoの削除に失敗しました: ${error.message}`);
  }
}
