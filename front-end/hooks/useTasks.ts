"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import type { CreateTaskInput, Task } from "@/types/task";
import * as tasks from "@/services/tasks";

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => ["tasks", "list"] as const,
  list: (filters?: unknown) =>
    filters
      ? (["tasks", "list", filters] as const)
      : (["tasks", "list"] as const),
  details: () => ["tasks", "detail"] as const,
  detail: (id: string) => ["tasks", "detail", id] as const,
};

function updateAllTaskLists(
  qc: ReturnType<typeof useQueryClient>,
  updater: (prev: Task[] | undefined) => Task[] | undefined
) {
  const queries = qc.getQueriesData<Task[]>({ queryKey: taskKeys.lists() });
  for (const [key] of queries) {
    qc.setQueryData<Task[] | undefined>(key, (prev) => updater(prev));
  }
}

export function useTasks(filters?: unknown) {
  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: async () => (await tasks.listTasks()) ?? [],
    placeholderData: (prev) => prev ?? [],
    staleTime: 30_000,
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: async () => (await tasks.getTask(id)) ?? null,
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useCreateTask(): UseMutationResult<
  Task,
  Error,
  CreateTaskInput
> {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: tasks.createTask,

    onMutate: async (input) => {
      await qc.cancelQueries({ queryKey: taskKeys.lists() });

      const tempId = `temp-${crypto.randomUUID()}`;
      const optimistic: Task = {
        id: tempId,
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
        startDate: input.startDate,
        deadline: input.deadline,
      };

      const prevLists = qc.getQueriesData<Task[]>({
        queryKey: taskKeys.lists(),
      });

      updateAllTaskLists(qc, (prev) =>
        prev ? [optimistic, ...prev] : [optimistic]
      );

      return { prevLists, tempId };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      for (const [key, data] of ctx.prevLists) {
        qc.setQueryData(key, data);
      }
    },

    onSuccess: (created, _vars, ctx) => {
      updateAllTaskLists(qc, (prev) =>
        prev?.map((t) => (t.id === ctx?.tempId ? created : t))
      );
      if (created?.id) {
        qc.setQueryData(taskKeys.detail(created.id), created);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
}

export function useUpdateTask(): UseMutationResult<
  Task,
  Error,
  { id: string; input: Partial<CreateTaskInput> }
> {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }) => tasks.updateTask(id, input),

    onMutate: async ({ id, input }) => {
      await qc.cancelQueries({ queryKey: taskKeys.lists() });

      const prevLists = qc.getQueriesData<Task[]>({
        queryKey: taskKeys.lists(),
      });
      const prevDetail = qc.getQueryData<Task | null>(taskKeys.detail(id));

      updateAllTaskLists(qc, (prev) =>
        prev?.map((t) => (t.id === id ? ({ ...t, ...input } as Task) : t))
      );

      if (prevDetail) {
        qc.setQueryData<Task>(taskKeys.detail(id), {
          ...prevDetail,
          ...input,
        } as Task);
      }

      return { prevLists, prevDetail, id };
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      for (const [key, data] of ctx.prevLists) {
        qc.setQueryData(key, data);
      }
      if (ctx.prevDetail) {
        qc.setQueryData(taskKeys.detail(ctx.id), ctx.prevDetail);
      }
    },

    onSuccess: (updated) => {
      if (updated?.id) {
        qc.setQueryData(taskKeys.detail(updated.id), updated);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
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

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: taskKeys.lists() });

      const prevLists = qc.getQueriesData<Task[]>({
        queryKey: taskKeys.lists(),
      });
      const prevDetail = qc.getQueryData<Task | null>(taskKeys.detail(id));

      updateAllTaskLists(qc, (prev) => prev?.filter((t) => t.id !== id));

      qc.removeQueries({ queryKey: taskKeys.detail(id) });

      return { prevLists, prevDetail, id };
    },

    onError: (_err, _id, ctx) => {
      if (!ctx) return;
      for (const [key, data] of ctx.prevLists) {
        qc.setQueryData(key, data);
      }
      if (ctx.prevDetail) {
        qc.setQueryData(taskKeys.detail(ctx.id), ctx.prevDetail);
      }
    },

    onSettled: (_res, _err, id) => {
      qc.invalidateQueries({ queryKey: taskKeys.lists() });
      if (id) qc.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
}
