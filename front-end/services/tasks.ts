import type { Task } from "@/types/task";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function safeJson(res: Response) {
  // trata 204 / corpo vazio
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function listTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/tasks`, { credentials: "include" });

  if (!res.ok) {
    throw new Error(`GET /tasks falhou: ${res.status}`);
  }

  const data = await safeJson(res);
  return Array.isArray(data) ? (data as Task[]) : [];
}

export async function getTask(id: string): Promise<Task | null> {
  const res = await fetch(`${API}/tasks/${id}`, { credentials: "include" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET /tasks/${id} falhou: ${res.status}`);
  const data = await safeJson(res);
  return (data ?? null) as Task | null;
}

export async function createTask(
  input: Omit<Task, "id" | "createdAt">
): Promise<Task> {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`POST /tasks falhou: ${res.status}`);
  const data = await safeJson(res);
  if (!data) throw new Error("Resposta vazia ao criar tarefa");
  return data as Task;
}

export async function updateTask(
  id: string,
  input: Partial<Omit<Task, "id">>
): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`PUT /tasks/${id} falhou: ${res.status}`);
  const data = await safeJson(res);
  if (!data) throw new Error("Resposta vazia ao atualizar tarefa");
  return data as Task;
}

export async function deleteTask(
  id: string
): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`DELETE /tasks/${id} falhou: ${res.status}`);
  const data = await safeJson(res);
  return (data ?? { success: true }) as { success: boolean; message?: string };
}
