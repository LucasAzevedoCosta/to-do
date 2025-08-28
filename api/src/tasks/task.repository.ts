import { InjectionToken } from '@nestjs/common';
import { TaskInput, TaskRow } from './types';

export const TASK_REPOSITORY = 'TASK_REPOSITORY' as InjectionToken;

export interface TaskRepository {
  findByUser(userId: string): Promise<TaskRow[]>;
  create(data: TaskInput & { id: string }): Promise<TaskRow>;
  update(id: string, data: Partial<TaskInput>): Promise<TaskRow | null>;
  delete(id: string): Promise<TaskRow | null>;
}
