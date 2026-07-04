"use server";

import { deleteTodo, toggleTodo } from "@/lib/todos";
import { revalidatePath } from "next/cache";

export async function toggleTodoAction(id: string) {
  await toggleTodo(id);
  revalidatePath("/");
}

export async function deleteTodoAction(id: string) {
  await deleteTodo(id);
  revalidatePath("/");
}
