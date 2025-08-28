export type TaskStatus = "nao_concluido" | "concluido";
export type TaskPriority = "baixa" | "media" | "alta" | "urgente";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  startDate: string;
  deadline: string;
  createdAt?: string;
  priority: TaskPriority;
  description: string;
}
