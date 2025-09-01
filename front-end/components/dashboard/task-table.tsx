"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskActions } from "./task-actions";
import { TaskStatusBadge } from "./task-status-badge";
import { PriorityBadge } from "./priority-badge";
import type { Task, CreateTaskInput } from "@/types/task";
import { formatDate } from "@/lib/utils/format-date";
import { isOverdue } from "@/lib/utils/tasks";
import { TaskEditDialog } from "./task-edit-dialog";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { toast } from "sonner";

interface TaskTableProps {
  tasks: Task[];
  onTaskAction: (taskId: string, action: string) => void;
}

export function TaskTable({ tasks, onTaskAction }: TaskTableProps) {
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  const handleAction = (taskId: string, action: string) => {
    const t = tasks.find((x) => x.id === taskId) || null;
    if (action === "edit") setEditTask(t);
    if (action === "delete") setDeleteTask(t);
    if (action === "view") onTaskAction?.(taskId, action);
    setMenuOpenFor(null);
  };

  const handleSaveEdit = (input: CreateTaskInput) => {
    if (!editTask) return;
    updateMutation.mutate(
      { id: editTask.id, input },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada!");
          setEditTask(null);
        },
        onError: () => {
          toast.error("Não foi possível atualizar.");
        },
      }
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTask) return;
    deleteMutation.mutate(deleteTask.id, {
      onSuccess: () => {
        toast.success("Tarefa excluída!");
        setDeleteTask(null);
      },
      onError: () => {
        toast.error("Não foi possível excluir.");
      },
    });
  };

  return (
    <div className="rounded-lg border bg-card overflow-x-auto">
      <Table className="min-w-[720px] md:min-w-0">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="font-semibold text-foreground">
              Título
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="font-semibold text-foreground hidden sm:table-cell">
              Prioridade
            </TableHead>
            <TableHead className="font-semibold text-foreground hidden md:table-cell">
              Data de Início
            </TableHead>
            <TableHead className="font-semibold text-foreground hidden md:table-cell">
              Prazo
            </TableHead>
            <TableHead className="font-semibold text-foreground text-right">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium text-foreground">
                {task.title}
                <div className="mt-1 text-xs text-muted-foreground sm:hidden">
                  <span className="mr-2">
                    <TaskStatusBadge status={task.status} />
                  </span>
                  <span className="mr-2">
                    <PriorityBadge priority={task.priority} />
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <TaskStatusBadge status={task.status} />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <PriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell className="text-muted-foreground hidden md:table-cell">
                {formatDate(task.startDate)}
              </TableCell>
              <TableCell
                className={`text-muted-foreground hidden md:table-cell ${
                  isOverdue(task.deadline, task.status)
                    ? "text-destructive font-medium"
                    : ""
                }`}
              >
                {formatDate(task.deadline)}
              </TableCell>
              <TableCell className="text-right">
                <TaskActions
                  taskId={task.id}
                  isOpen={menuOpenFor === task.id}
                  onOpenChange={(open) => setMenuOpenFor(open ? task.id : null)}
                  onAction={handleAction}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Editar */}
      <TaskEditDialog
        task={editTask}
        isOpen={!!editTask}
        onOpenChange={(open) => !open && setEditTask(null)}
      />
      {/* Excluir */}
      <DeleteConfirmationDialog
        isOpen={!!deleteTask}
        onOpenChange={(open) => !open && setDeleteTask(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={deleteTask?.title ?? ""}
        confirmDisabled={deleteMutation.isPending}
        confirmLabel={deleteMutation.isPending ? "Excluindo..." : "Excluir"}
      />
    </div>
  );
}
