"use server";

import { toggleTodo } from "@/lib/todos";
import { revalidatePath } from "next/cache";

export async function toggleTodoAction(id: string) {
  await toggleTodo(id);
  revalidatePath("/");
}
