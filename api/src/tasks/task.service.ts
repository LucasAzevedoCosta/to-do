import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as schema from 'src/db/schema';
import { DRIZZLE_DB } from 'src/db/drizzle.provider';
import { uuidv4 } from 'better-auth';

interface TaskInput {
  title: string;
  description: string;
  status: 'concluido' | 'nao_concluido';
  priority: 'urgente' | 'alta' | 'media' | 'baixa';
  startDate: Date;
  deadline: Date;
  userId: string;
}

@Injectable()
export class TaskService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: any,
  ) {}

  async getTasksByUser(userId: string) {
    const tasks = await this.db.select().from(schema.task).where(eq(schema.task.userId, userId));
    return tasks.map((t: { id: any; title: any; description: any; status: any; priority: any; userId: any; createdAt: any; deadline: any; startDate: any; }) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      status: t.status,
      priority: t.priority,
      userId: t.userId,
      createdAt: t.createdAt,
      deadline: t.deadline,
      startDate: t.startDate,
    }));
  }

  async createTask(input: TaskInput) {
    const newTask = {
      id: uuidv4(),
      title: input.title,
      description: input.description,
      status: input.status,
      priority: input.priority,
      startDate: new Date(input.startDate),
      deadline: new Date(input.deadline),
      userId: input.userId,
    };

    const result = await this.db.insert(schema.task).values(newTask).returning();

    const created = result[0];

    return {
      id: created.id,
      title: created.title,
      description: created.description,
      status: created.status,
      priority: created.priority,
      userId: created.userId,
      createdAt: created.createdAt,
      deadline: created.deadline,
      startDate: created.startDate,
    };
  }

  async updateTask(taskId: string, input: Partial<TaskInput>) {
    const updated = await this.db
      .update(schema.task)
      .set({
        ...(input.title && { title: input.title }),
        ...(input.description && { description: input.description }),
        ...(input.status && { status: input.status }),
        ...(input.priority && { priority: input.priority }),
        ...(input.startDate && { startDate: new Date(input.startDate) }),
        ...(input.deadline && { deadline: new Date(input.deadline) }),
      })
      .where(eq(schema.task.id, taskId))
      .returning();

    const result = updated[0];

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      status: result.status,
      priority: result.priority,
      userId: result.userId,
      createdAt: result.createdAt,
      deadline: result.deadline,
      startDate: result.startDate,
    };
  }

  async deleteTask(taskId: string) {
    const deleted = await this.db
      .delete(schema.task)
      .where(eq(schema.task.id, taskId))
      .returning();

    return deleted[0];
  }
}
