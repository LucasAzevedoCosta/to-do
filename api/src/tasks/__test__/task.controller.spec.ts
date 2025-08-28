import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import { TaskPriority, TaskStatus } from '../dto/create-task.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { mockTaskService } from '../__mocks__/task.service.mock';

describe('TaskController', () => {
  let controller: TaskController;
  let service: jest.Mocked<TaskService>;

  const mockSession: any = { user: { id: 'user-123' } };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get(TaskService);
  });

  describe('createTask', () => {
    it('deve criar uma nova tarefa', async () => {
      const dto = {
        title: 'Nova tarefa',
        description: 'Descrição',
        status: TaskStatus.NaoConcluido,
        priority: TaskPriority.Baixa,
        startDate: new Date(),
        deadline: new Date(),
      };

      const result = await controller.createTask(mockSession, dto);

      expect(service.createTask).toHaveBeenCalledWith({
        ...dto,
        userId: 'user-123',
      });
      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Nova tarefa');
    });
  });

  describe('updateTask', () => {
    it('deve atualizar uma tarefa existente', async () => {
      const dto = { title: 'Atualizada' };

      const result = await controller.updateTask('task-1', dto);

      expect(service.updateTask).toHaveBeenCalledWith('task-1', dto);
      expect(result.title).toBe('Atualizada');
    });

    it('deve lançar NotFoundException se id estiver vazio', async () => {
      await expect(controller.updateTask('', { title: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteTask', () => {
    it('deve deletar uma tarefa existente', async () => {
      const result = await controller.deleteTask('task-1');

      expect(service.deleteTask).toHaveBeenCalledWith('task-1');
      expect(result).toEqual({ id: 'task-1', title: 'Deletada' });
    });

    it('deve lançar NotFoundException se id estiver vazio', async () => {
      await expect(controller.deleteTask('')).rejects.toThrow(NotFoundException);
    });
  });
});
