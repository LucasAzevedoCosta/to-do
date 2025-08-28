import { v4 as uuidv4 } from 'uuid';
import { TaskRepository } from '../task.repository';
import { TaskInput } from '../types';

export const mockTaskRepository: jest.Mocked<TaskRepository> = {
  findByUser: jest.fn().mockResolvedValue([
    {
      id: uuidv4(),
      title: 'Tarefa de teste',
      description: 'Descrição teste',
      status: 'nao_concluido',
      priority: 'baixa',
      userId: 'user-123',
      createdAt: new Date(),
      startDate: new Date(),
      deadline: new Date(),
    },
  ]),
  create: jest.fn().mockImplementation(async (data: TaskInput & { id: string }) => ({
    ...data,
    createdAt: new Date(),
  })),
  update: jest.fn().mockImplementation(async (id: string, data: Partial<TaskInput>) => ({
    id,
    ...data,
    createdAt: new Date(),
  })),
  delete: jest.fn().mockImplementation(async (id: string) => ({
    id,
    title: 'Tarefa excluída',
  })),
};