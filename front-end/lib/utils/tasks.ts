import { Task } from "@/types/task";

export function isFormValid(task: Task): { valid: boolean; message?: string } {
  const { title, description, status, priority, startDate, deadline } = task;

  if (
    !title ||
    !description ||
    !status ||
    !priority ||
    !startDate ||
    !deadline
  ) {
    return { valid: false, message: "Todos os campos devem ser preenchidos." };
  }

  const start = new Date(startDate);
  const end = new Date(deadline);

  if (end < start) {
    return {
      valid: false,
      message: "O prazo deve ser posterior ou igual à data de início.",
    };
  }

  return { valid: true };
}

export const isOverdue = (deadline: string, status: string) => {
  if (status === "concluido") return false;
  const today = new Date();
  const aDeadline = new Date(deadline);
  return aDeadline < today;
};
