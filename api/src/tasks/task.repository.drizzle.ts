import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as schema from 'src/db/schema';
import { DRIZZLE_DB } from 'src/db/drizzle.provider';
import { TaskRepository } from './task.repository';
import { TaskRow, TaskInput } from './types';

@Injectable()
export class DrizzleTaskRepository implements TaskRepository {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: any,
  ) {}

  async findByUser(userId: string): Promise<TaskRow[]> {
    return this.db
      .select()
      .from(schema.task)
      .where(eq(schema.task.userId, userId));
  }

  async create(data: TaskInput & { id: string }): Promise<TaskRow> {
    const [created] = await this.db
      .insert(schema.task)
      .values({
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        startDate: new Date(data.startDate),
        deadline: new Date(data.deadline),
        userId: data.userId,
      })
      .returning();
    return created;
  }

  async update(id: string, data: Partial<TaskInput>): Promise<TaskRow | null> {
    const [updated] = await this.db
      .update(schema.task)
      .set({
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.startDate !== undefined && {
          startDate: new Date(data.startDate),
        }),
        ...(data.deadline !== undefined && {
          deadline: new Date(data.deadline),
        }),
      })
      .where(eq(schema.task.id, id))
      .returning();
    return updated ?? null;
  }

  async delete(id: string): Promise<TaskRow | null> {
    const [deleted] = await this.db
      .delete(schema.task)
      .where(eq(schema.task.id, id))
      .returning();
    return deleted ?? null;
  }
}
