"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Task, CreateTaskInput } from "@/types/task";
import { isFormValid } from "@/lib/utils/tasks";
import { useUpdateTask } from "@/hooks/useTasks";

interface TaskEditDialogProps {
  task: Task | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskEditDialog({
  task,
  isOpen,
  onOpenChange,
}: TaskEditDialogProps) {
  const [formData, setFormData] = useState<CreateTaskInput>({
    title: "",
    description: "",
    status: "nao_concluido",
    priority: "baixa",
    startDate: "",
    deadline: "",
  });

  const updateTaskMutation = useUpdateTask();

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
      });
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    const validation = isFormValid(formData);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    updateTaskMutation.mutate(
      { id: task.id, input: formData },
      {
        onSuccess: () => {
          toast.success("Tarefa editada com sucesso!");
          onOpenChange(false);
        },
        onError: () => {
          toast.error("Erro ao editar a tarefa.");
        },
      }
    );
  };

  const fmt = (d?: string | Date | null) =>
    d ? new Date(d).toISOString().split("T")[0] : "";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={formData.title}
              onChange={(e) =>
                setFormData((s) => ({ ...s, title: e.target.value }))
              }
              placeholder="Digite o título da tarefa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.description}
              onChange={(e) =>
                setFormData((s) => ({ ...s, description: e.target.value }))
              }
              placeholder="Digite a descrição da tarefa"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v: "concluido" | "nao_concluido") =>
                  setFormData((s) => ({ ...s, status: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="nao_concluido">Não concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(v: "urgente" | "alta" | "media" | "baixa") =>
                  setFormData((s) => ({ ...s, priority: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgente">⚡ Urgente</SelectItem>
                  <SelectItem value="alta">🔴 Alta</SelectItem>
                  <SelectItem value="media">🟡 Média</SelectItem>
                  <SelectItem value="baixa">🟢 Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data de Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={fmt(formData.startDate)}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, startDate: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prazo">Prazo</Label>
              <Input
                id="prazo"
                type="date"
                value={fmt(formData.deadline)}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, deadline: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={updateTaskMutation.isPending}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={updateTaskMutation.isPending}>
            {updateTaskMutation.isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
