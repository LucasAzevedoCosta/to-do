import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from '../task.service';
import { TASK_REPOSITORY, TaskRepository } from '../task.repository';
import { TaskPriority, TaskStatus } from '../dto/create-task.dto';
import { mockTaskRepository } from '../__mocks__/task.repository.mock';
import { NotFoundException } from '@nestjs/common';
import { TaskInput } from '../types';

describe('TaskService', () => {
  let service: TaskService;
  let repo: jest.Mocked<TaskRepository>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TASK_REPOSITORY, useValue: mockTaskRepository },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repo = module.get(TASK_REPOSITORY);
  });

  describe('getTasksByUser', () => {
    it('deve retornar as tarefas do usuário', async () => {
      repo.findByUser.mockResolvedValueOnce([
        {
          id: 'task-1',
          title: 'A',
          description: 'B',
          status: 'nao_concluido',
          priority: 'baixa',
          userId: 'user-1',
          createdAt: new Date(),
          startDate: new Date(),
          deadline: new Date(),
        },
      ]);

      const result = await service.getTasksByUser('user-1');
      expect(repo.findByUser).toHaveBeenCalledWith('user-1');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('task-1');
    });
  });

  describe('createTask', () => {
    it('deve criar e retornar a tarefa', async () => {
      const input: TaskInput = {
        title: 'Nova',
        description: 'Desc',
        status: TaskStatus.NaoConcluido,
        priority: TaskPriority.Baixa,
        startDate: new Date(),
        deadline: new Date(),
        userId: 'user-1',
      };

      // para checar o id gerado, fazemos o repo.create ecoar o mesmo shape
      repo.create.mockImplementationOnce(async (data) => ({
        ...data,
        createdAt: new Date(),
      }));

      const result = await service.createTask(input);

      expect(repo.create).toHaveBeenCalledTimes(1);
      const calledWith = repo.create.mock.calls[0][0];
      expect(calledWith.id).toBeDefined();
      expect(result).toMatchObject({
        title: 'Nova',
        userId: 'user-1',
      });
    });
  });

  describe('updateTask', () => {
    it('deve atualizar e retornar a tarefa', async () => {
      repo.update.mockResolvedValueOnce({
        id: 'task-1',
        title: 'Atualizada',
        description: 'X',
        status: TaskStatus.NaoConcluido,
        priority: TaskPriority.Baixa,
        userId: 'user-1',
        startDate: new Date(),
        deadline: new Date(),
        createdAt: new Date(),
      });

      const result = await service.updateTask('task-1', { title: 'Atualizada' });

      expect(repo.update).toHaveBeenCalledWith('task-1', { title: 'Atualizada' });
      expect(result.id).toBe('task-1');
      expect(result.title).toBe('Atualizada');
    });

    it('deve lançar NotFoundException quando repo.update retornar null', async () => {
      repo.update.mockResolvedValueOnce(null);

      await expect(service.updateTask('task-x', { title: 'N/A' }))
        .rejects
        .toThrow(NotFoundException);

      expect(repo.update).toHaveBeenCalledWith('task-x', { title: 'N/A' });
    });
  });

  describe('deleteTask', () => {
    it('deve deletar e retornar a tarefa', async () => {
      repo.delete.mockResolvedValueOnce({ id: 'task-1', title: 'Apagada' } as any);

      const result = await service.deleteTask('task-1');

      expect(repo.delete).toHaveBeenCalledWith('task-1');
      expect(result).toEqual({ id: 'task-1', title: 'Apagada' });
    });

    it('deve lançar NotFoundException quando repo.delete retornar null', async () => {
      repo.delete.mockResolvedValueOnce(null);

      await expect(service.deleteTask('task-x'))
        .rejects
        .toThrow(NotFoundException);

      expect(repo.delete).toHaveBeenCalledWith('task-x');
    });
  });
});
