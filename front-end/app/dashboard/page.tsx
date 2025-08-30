"use client";

import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { TaskListCard } from "@/components/dashboard/task-list-card";
import {
  TaskFilters,
  type TaskFilters as TaskFiltersType,
} from "@/components/dashboard/task-filters";
import { TaskViewDialog } from "@/components/dashboard/task-view-dialog";
import { TaskEditDialog } from "@/components/dashboard/task-edit-dialog";
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-dialog";
import { toast } from "sonner";
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "@/hooks/useTasks";
import type { Task } from "@/types/task";

export default function Dashboard() {
  const [filters, setFilters] = useState<TaskFiltersType>({
    search: "",
    status: "all",
    priority: "all",
  });

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useTasks();

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus =
        filters.status === "all" || task.status === filters.status;
      const matchesPriority =
        filters.priority === "all" || task.priority === filters.priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  const handleTaskAction = (taskId: string, action: string) => {
    const task = tasks?.find((t) => t.id === taskId);
    if (!task) return;
    if (action === "view") setViewTask(task);
    if (action === "edit") setEditTask(task);
    if (action === "delete") setDeleteTask(task);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={() =>
            setFilters({ search: "", status: "all", priority: "all" })
          }
        />

        <TaskListCard
          tasks={filteredTasks}
          onTaskAction={handleTaskAction}
        />
      </main>

      {/* Diálogos */}
      <TaskViewDialog
        task={viewTask}
        isOpen={!!viewTask}
        onOpenChange={(open) => {
          if (!open) setViewTask(null);
        }}
      />

      <TaskEditDialog
        task={editTask}
        isOpen={!!editTask}
        onOpenChange={(open) => {
          if (!open) setEditTask(null);
        }}
      />

      <DeleteConfirmationDialog
        isOpen={!!deleteTask}
        onOpenChange={(open) => {
          if (!open) setDeleteTask(null);
        }}
        onConfirm={() => {
          if (!deleteTask) return;
          deleteTaskMutation.mutate(deleteTask.id, {
            onSuccess: () => {
              toast.success("Tarefa deletada com sucesso!");
              setDeleteTask(null);
            },
            onError: () => toast.error("Erro ao deletar tarefa."),
          });
        }}
        taskTitle={deleteTask?.title ?? ""}
      />
    </div>
  );
}
