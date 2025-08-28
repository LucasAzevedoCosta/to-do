export type TaskStatus = "pendente" | "em_progresso" | "concluido";
export type TaskPriority = "baixa" | "media" | "alta" | "critica";

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
