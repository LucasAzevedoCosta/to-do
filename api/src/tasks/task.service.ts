import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TaskInput } from './types';
import * as taskRepository from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    @Inject(taskRepository.TASK_REPOSITORY)
    private readonly repo: taskRepository.TaskRepository,
  ) {}

  async getTasksByUser(userId: string) {
    const tasks = await this.repo.findByUser(userId);
    return tasks;
  }

  async createTask(input: TaskInput) {
    const created = await this.repo.create({ ...input, id: uuidv4() });
    return created;
  }

  async updateTask(taskId: string, input: Partial<TaskInput>) {
    const updated = await this.repo.update(taskId, input);
    if (!updated) throw new NotFoundException('Tarefa não encontrada');
    return updated;
  }

  async deleteTask(taskId: string) {
    const deleted = await this.repo.delete(taskId);
    if (!deleted) throw new NotFoundException('Tarefa não encontrada');
    return deleted;
  }
}