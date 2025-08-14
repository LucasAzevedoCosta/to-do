import axiosInstance from "../axios/axiosInstance";
import { TaskStatus } from "@/components/dashboard/task-status-badge";
import { TaskPriority } from "@/components/dashboard/priority-badge";

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

export async function createTask(
  taskData: Omit<Task, "id">,
  onTaskCreated: (newTask: Task) => void
) {
  try {
    const res = await axiosInstance.post("/tasks", taskData);
    const createdTask: Task = res.data;
    onTaskCreated(createdTask);
    console.log("Nova tarefa criada:", createdTask);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
  }
}

export async function updateTaskById(id: string, task: Partial<Task>) {
  try {
    const res = await axiosInstance.put(`/tasks/${id}`, task);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Erro ao atualizar tarefa"
      );
    } else {
      throw new Error("Erro de conexão com o servidor");
    }
  }
}

export async function deleteTaskApi(taskId: string) {
  try {
    const res = await axiosInstance.delete(`/tasks/${taskId}`);
    return res.data;
  } catch (error) {
    throw new Error("Erro ao deletar a tarefa");
  }
}

export const isOverdue = (deadline: string, status: string) => {
  if (status === "concluido") return false;
  const today = new Date();
  const aDeadline = new Date(deadline);
  return aDeadline < today;
};
