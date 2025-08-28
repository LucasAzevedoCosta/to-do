import axios from "@/lib/api/axios";
import type { Task } from "@/types/task";


export async function listTasks(): Promise<Task[]> {
  const { data } = await axios.get<{ tasks: Task[] }>("/tasks");
  return data.tasks;
}

export async function getTask(id: string): Promise<Task> {
  const { data } = await axios.get<{ task: Task }>(`/tasks/${id}`);
  return data.task;
}

export async function createTask(
  input: Omit<Task, "id" | "createdAt">
): Promise<Task> {
  const { data } = await axios.post<{ task: Task }>("/tasks", input);
  return data.task;
}

export async function updateTask(
  id: string,
  input: Partial<Omit<Task, "id">>
): Promise<Task> {
  const { data } = await axios.patch<{ task: Task }>(`/tasks/${id}`, input);
  return data.task;
}

export async function deleteTask(
  id: string
): Promise<{ success: boolean; message?: string }> {
  const { data } = await axios.delete<{ success: boolean; message?: string }>(
    `/tasks/${id}`
  );
  return data;
}
