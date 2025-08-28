import { v4 as uuidv4 } from 'uuid';
import { TaskPriority, TaskStatus } from '../dto/create-task.dto';

type CreateTaskInput = {
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  startDate?: Date | null;
  deadline?: Date | null;
  userId: string;
};

type UpdateTaskInput = Partial<Omit<CreateTaskInput, 'userId'>>;

export const mockTaskService = {
  getTasksByUser: jest.fn().mockImplementation(async (userId: string) => [
    {
      id: uuidv4(),
      title: 'Tarefa de teste',
      description: 'Descrição teste',
      status: TaskStatus.NaoConcluido,
      priority: TaskPriority.Baixa,
      userId,
      createdAt: new Date(),
      startDate: new Date(),
      deadline: new Date(),
    },
  ]),

  createTask: jest.fn().mockImplementation(async (data: CreateTaskInput) => {
    const now = new Date();
    return {
      id: uuidv4(),
      title: data.title,
      description: data.description ?? null,
      status: data.status,
      priority: data.priority,
      userId: data.userId,
      startDate: data.startDate ?? null,
      deadline: data.deadline ?? null,
      createdAt: now,
    };
  }),

  updateTask: jest.fn().mockImplementation(async (id: string, data: UpdateTaskInput) => {
    const title = data.title ?? 'Atualizada';
    return {
      id,
      title,
      description: data.description ?? 'Descrição',
      status: data.status ?? TaskStatus.NaoConcluido,
      priority: data.priority ?? TaskPriority.Baixa,
      userId: 'user-123',
      startDate: data.startDate ?? new Date(),
      deadline: data.deadline ?? new Date(),
      createdAt: new Date(),
    };
  }),

  deleteTask: jest.fn().mockImplementation(async (id: string) => {
    return { id, title: 'Deletada' };
  }),
} as any;

export const resetMockTaskService = () => {
  mockTaskService.getTasksByUser.mockClear();
  mockTaskService.createTask.mockClear();
  mockTaskService.updateTask.mockClear();
  mockTaskService.deleteTask.mockClear();
};