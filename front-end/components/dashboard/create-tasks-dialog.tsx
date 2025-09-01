"use client";

import { useState } from "react";
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
import type { CreateTaskInput, Task, TaskForm } from "@/types/task";
import { isFormValid } from "@/lib/utils/tasks";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Omit<Task, "id" | "createdAt">) => void;
}

const emptyTask: Omit<Task, "id" | "createdAt"> = {
  title: "",
  description: "",
  status: "nao_concluido",
  priority: "baixa",
  startDate: "",
  deadline: "",
};

export function CreateTaskDialog({
  isOpen,
  onOpenChange,
  onSave,
}: CreateTaskDialogProps) {
  const [formData, setFormData] = useState<CreateTaskInput>(emptyTask);

  const handleSave = () => {
    const validation = isFormValid(formData as TaskForm);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    onSave(formData);
    setFormData(emptyTask);
    onOpenChange(false);
    toast.success("Tarefa criada com sucesso!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Tarefa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((s) => ({ ...s, title: e.target.value }))
              }
              placeholder="Digite o título da tarefa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
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
                onValueChange={(value: "concluido" | "nao_concluido") =>
                  setFormData((s) => ({ ...s, status: value }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="nao_concluido">Não concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(
                  value: "urgente" | "alta" | "media" | "baixa"
                ) => setFormData((s) => ({ ...s, priority: value }))}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecione" />
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
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, startDate: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Prazo</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, deadline: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Criar Tarefa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
