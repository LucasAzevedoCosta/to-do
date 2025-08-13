import { Test, TestingModule } from '@nestjs/testing';
import { mockTaskService } from '../__mocks__/task.service.mock';
import { NotFoundException } from '@nestjs/common';
import { TaskService } from '../task.service';
import { TaskController } from '../task.controller';
import { TaskPriority, TaskStatus } from '../dto/create-task.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<TaskController>(TaskController);
  });

  describe('findAll', () => {
    it('deve retornar todas as tarefas do usuário', async () => {
      const session = { user: { id: 'user-123' } } as any;
      const result = await controller.findAll(session);
      expect(result).toHaveLength(1);
      expect(result[0].userId).toBe('user-123');
      expect(mockTaskService.getTasksByUser).toHaveBeenCalledWith('user-123');
    });
  });

  describe('createTask', () => {
    it('deve criar uma nova tarefa', async () => {
      const session = { user: { id: 'user-123' } } as any;
      const dto = {
        title: 'Nova tarefa',
        description: 'Descrição',
        status: TaskStatus.NaoConcluido,
        priority: TaskPriority.Baixa,
        startDate: new Date(),
        deadline: new Date(),
      };
      const result = await controller.createTask(session, dto);
      expect(result).toMatchObject({
        title: 'Nova tarefa',
        userId: 'user-123',
      });
      expect(mockTaskService.createTask).toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    it('deve atualizar a tarefa', async () => {
      const updateDto = { title: 'Atualizado' };
      const result = await controller.updateTask('task-123', updateDto);
      expect(result).toMatchObject({ id: 'task-123', title: 'Atualizado' });
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(
        'task-123',
        updateDto,
      );
    });

    it('deve lançar erro se ID não for fornecido', async () => {
      await expect(controller.updateTask('', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteTask', () => {
    it('deve deletar a tarefa', async () => {
      const result = await controller.deleteTask('task-123');
      expect(result).toMatchObject({
        id: 'task-123',
        title: 'Tarefa excluída',
      });
      expect(mockTaskService.deleteTask).toHaveBeenCalledWith('task-123');
    });

    it('deve lançar erro se ID não for fornecido', async () => {
      await expect(controller.deleteTask('')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
