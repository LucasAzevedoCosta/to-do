export const mockUserSession = {
  user: {
    id: 'user-123',
    name: 'João da Silva',
    email: 'joao@email.com',
    emailVerified: true,
    image: 'https://example.com/avatar.png',
  },
};

export const mockAuthGuard = {
  canActivate: jest.fn().mockReturnValue(true),
};