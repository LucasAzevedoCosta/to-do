import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskTable, } from "./task-table";
import { CreateTaskDialog } from "./create-tasks-dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { createTask, Task } from "@/lib/tasks/task-helpers";

interface TaskListCardProps {
  tasks: Task[];
  onTaskAction: (taskId: string, action: string) => void;
  onTaskCreated: (newTask: Task) => void;
}

export function TaskListCard({
  tasks,
  onTaskAction,
  onTaskCreated,
}: TaskListCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveTask = (taskData: Omit<Task, "id">) => {
  createTask(taskData, onTaskCreated);
};

  return (
    <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Lista de Tarefas
          </h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-muted text-foreground hover:bg-muted/70 transition-colors flex items-center gap-2 rounded-md px-4 py-2"
            >
              Nova Tarefa
            </Button>
            <Badge variant="outline" className="text-muted-foreground">
              {tasks.length} itens
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <TaskTable tasks={tasks} onTaskAction={onTaskAction} />
      </CardContent>

      <CreateTaskDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveTask}
      />
    </Card>
  );
}
