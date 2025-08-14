import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

 jest.mock('../auth', () => ({
  auth: require('../__mocks__/auth.mock').auth,
}));

import { auth } from '../auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('deve retornar sucesso quando o login for bem-sucedido', async () => {
      (auth.api.signInEmail as unknown as jest.Mock).mockResolvedValueOnce({});

      const result = await service.signIn('test@example.com', 'senha123');
      expect(auth.api.signInEmail).toHaveBeenCalledWith({
        body: { email: 'test@example.com', password: 'senha123' },
      });
      expect(result).toEqual({
        success: true,
        message: 'Signed in successfully.',
      });
    });

    it('deve retornar erro quando o login falhar', async () => {
      (auth.api.signInEmail as unknown as jest.Mock).mockRejectedValueOnce(
        new Error('Credenciais inválidas')
      );

      const result = await service.signIn('test@example.com', 'senha123');
      expect(result).toEqual({
        success: false,
        message: 'Credenciais inválidas',
      });
    });
  });

  describe('signUp', () => {
    it('deve retornar sucesso quando o registro for bem-sucedido', async () => {
      (auth.api.signUpEmail as unknown as jest.Mock).mockResolvedValueOnce({});

      const result = await service.signUp(
        'newuser@example.com',
        'senha123',
        'newuser'
      );
      expect(auth.api.signUpEmail).toHaveBeenCalledWith({
        body: {
          email: 'newuser@example.com',
          password: 'senha123',
          name: 'newuser',
        },
      });
      expect(result).toEqual({
        success: true,
        message: 'Signed up successfully.',
      });
    });

    it('deve retornar erro quando o registro falhar', async () => {
      (auth.api.signUpEmail as unknown as jest.Mock).mockRejectedValueOnce(
        new Error('Email já está em uso')
      );

      const result = await service.signUp(
        'newuser@example.com',
        'senha123',
        'newuser'
      );
      expect(result).toEqual({
        success: false,
        message: 'Email já está em uso',
      });
    });
  });
});
