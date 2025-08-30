"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import type { Task } from "@/types/task";
import * as tasks from "@/services/tasks";

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => ["tasks", "list"] as const,
  list: (filters?: unknown) =>
    (filters
      ? (["tasks", "list", filters] as const)
      : (["tasks", "list"] as const)),
  details: () => ["tasks", "detail"] as const,
  detail: (id: string) => ["tasks", "detail", id] as const,
};


export function useTasks(filters?: unknown) {
  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: async () => {
      const data = await tasks.listTasks();
      return data ?? [];
    },
    placeholderData: [],
    staleTime: 30_000,
  });
}


export function useTask(id: string) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: async () => {
      const data = await tasks.getTask(id);
      return data ?? null;
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useCreateTask(): UseMutationResult<
  Task,
  Error,
  Omit<Task, "id" | "createdAt">
> {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasks.createTask,
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
      if (created?.id) {
        qc.setQueryData(taskKeys.detail(created.id), created);
      }
    },
  });
}


export function useUpdateTask(): UseMutationResult<
  Task,
  Error,
  { id: string; input: Partial<Omit<Task, "id">> }
> {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }) => tasks.updateTask(id, input),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
      if (updated?.id) {
        qc.setQueryData(taskKeys.detail(updated.id), updated);
      }
    },
  });
}

export function useDeleteTask(): UseMutationResult<
  { success: boolean; message?: string },
  Error,
  string
> {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tasks.deleteTask(id),
    onSuccess: (_res, id) => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
      if (id) qc.removeQueries({ queryKey: taskKeys.detail(id) });
    },
  });
}
