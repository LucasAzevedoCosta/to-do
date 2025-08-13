import { v4 as uuidv4 } from 'uuid';

export const mockTaskService = {
  getTasksByUser: jest.fn().mockImplementation((userId: string) => {
    return [
      {
        id: uuidv4(),
        title: 'Tarefa de teste',
        description: 'Descrição teste',
        status: 'nao_concluido',
        priority: 'baixa',
        userId,
        createdAt: new Date(),
        startDate: new Date(),
        deadline: new Date(),
      },
    ];
  }),

  createTask: jest.fn().mockImplementation((taskData) => {
    return {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date(),
    };
  }),

  updateTask: jest.fn().mockImplementation((taskId, updateData) => {
    return {
      id: taskId,
      ...updateData,
      createdAt: new Date(),
    };
  }),

  deleteTask: jest.fn().mockImplementation((taskId) => {
    return {
      id: taskId,
      title: 'Tarefa excluída',
    };
  }),
};