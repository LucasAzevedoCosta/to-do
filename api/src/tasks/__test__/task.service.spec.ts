import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from '../task.service';
import { TaskPriority, TaskStatus } from '../dto/create-task.dto';
import { DRIZZLE_DB } from 'src/db/drizzle.provider';
import { schema } from 'src/db/schema';

describe('TaskService', () => {
  let service: TaskService;
  let mockDb: any;

  beforeEach(async () => {
    jest.clearAllMocks();

    const insertReturningMock = jest.fn();
    const insertValuesMock = jest.fn(() => ({ returning: insertReturningMock }));

    const updateReturningMock = jest.fn();
    const updateWhereMock = jest.fn(() => ({ returning: updateReturningMock }));
    const updateSetMock = jest.fn(() => ({ where: updateWhereMock }));
    const updateMock = jest.fn(() => ({ set: updateSetMock }));

    const deleteReturningMock = jest.fn();
    const deleteWhereMock = jest.fn(() => ({ returning: deleteReturningMock }));
    const deleteMock = jest.fn(() => ({ where: deleteWhereMock }));

    mockDb = {
      select: jest.fn(() => mockDb),
      from: jest.fn(() => mockDb),
      where: jest.fn(() => Promise.resolve([])),

      insert: jest.fn(() => ({
        values: insertValuesMock,
      })),

      update: updateMock,

      delete: deleteMock,

      _mocks: {
        insertReturningMock,
        updateReturningMock,
        deleteReturningMock,
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, { provide: DRIZZLE_DB, useValue: mockDb }],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe('getTasksByUser', () => {
    it('deve retornar as tarefas do usuário', async () => {
      const fakeTasks = [
        {
          id: 'task-123',
          title: 'Teste',
          description: 'Desc',
          status: TaskStatus.NaoConcluido,
          priority: TaskPriority.Baixa,
          userId: 'user-1',
          createdAt: new Date(),
          deadline: new Date(),
          startDate: new Date(),
        },
      ];

      mockDb.where.mockResolvedValue(fakeTasks);

      const result = await service.getTasksByUser('user-1');

      expect(mockDb.select).toHaveBeenCalled();
      expect(mockDb.from).toHaveBeenCalledWith(schema.task);
      expect(result).toEqual(fakeTasks);
    });
  });

  describe('createTask', () => {
    it('deve criar e retornar uma tarefa', async () => {
      const input = {
        title: 'Nova tarefa',
        description: 'Desc',
        status: TaskStatus.NaoConcluido,
        priority: TaskPriority.Baixa,
        startDate: new Date(),
        deadline: new Date(),
        userId: 'user-1',
      };
      const createdTask = { id: uuidv4(), ...input, createdAt: new Date() };

      mockDb._mocks.insertReturningMock.mockResolvedValue([createdTask]);

      const result = await service.createTask(input);

      expect(mockDb.insert).toHaveBeenCalledWith(schema.task);
      expect(mockDb._mocks.insertReturningMock).toHaveBeenCalled();
      expect(result).toMatchObject(input);
    });
  });

  describe('updateTask', () => {
    it('deve atualizar e retornar a tarefa', async () => {
      const updatedTask = {
        id: 'task-1',
        title: 'Atualizado',
        description: 'Desc',
        status: TaskStatus.NaoConcluido,
        priority: TaskPriority.Baixa,
        userId: 'user-1',
        createdAt: new Date(),
        deadline: new Date(),
        startDate: new Date(),
      };

      mockDb._mocks.updateReturningMock.mockResolvedValue([updatedTask]);

      const result = await service.updateTask('task-1', {
        title: 'Atualizado',
      });

      expect(mockDb.update).toHaveBeenCalledWith(schema.task);
      expect(mockDb._mocks.updateReturningMock).toHaveBeenCalled();
      expect(result).toMatchObject({ id: 'task-1', title: 'Atualizado' });
    });
  });

  describe('deleteTask', () => {
    it('deve deletar e retornar a tarefa', async () => {
      const deletedTask = { id: 'task-1', title: 'Apagada' };

      mockDb._mocks.deleteReturningMock.mockResolvedValue([deletedTask]);

      const result = await service.deleteTask('task-1');

      expect(mockDb.delete).toHaveBeenCalledWith(schema.task);
      expect(mockDb._mocks.deleteReturningMock).toHaveBeenCalled();
      expect(result).toEqual(deletedTask);
    });
  });
});
