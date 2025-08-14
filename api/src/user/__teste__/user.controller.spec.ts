import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { UserController } from '../user.controller';
import { mockAuthGuard, mockUserSession } from 'src/auth/__mocks__/auth-session.mock';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  describe('getProfile', () => {
    it('deve retornar os dados do usuário autenticado', async () => {
      const result = await controller.getProfile(mockUserSession as any);
      expect(result).toEqual({ user: mockUserSession.user });
    });
  });
});