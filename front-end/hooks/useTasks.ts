"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@/types/task";
import * as tasks from "@/services/tasks";

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
  list: (filters?: unknown) => [...taskKeys.lists(), { filters }] as const,
  details: () => [...taskKeys.all, "detail"] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
};

// 🔹 Lista de tarefas
export function useTasks() {
  return useQuery({
    queryKey: taskKeys.list(),
    queryFn: tasks.listTasks,
  });
}

// 🔹 Detalhe de uma tarefa específica
export function useTask(id: string) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => tasks.getTask(id),
    enabled: !!id, // só executa se tiver id
  });
}

// 🔹 Criar tarefa
export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasks.createTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
}

// 🔹 Atualizar tarefa
export function useUpdateTask(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<Omit<Task, "id">>) => tasks.updateTask(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.detail(id) });
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
}

// 🔹 Deletar tarefa
export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasks.deleteTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
}
