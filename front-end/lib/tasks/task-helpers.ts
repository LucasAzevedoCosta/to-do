import { Task } from "@/components/dashboard/task-table";
import axiosInstance from "../axios/axiosInstance";

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
