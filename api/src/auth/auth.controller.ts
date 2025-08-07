import { Controller, All, Req, Res } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH') private auth: ReturnType<typeof betterAuth>) {}

  @All('*')
  async betterAuthHandler(@Req() req: Request, @Res() res: Response) {
    const handler = toNodeHandler(this.auth);
    return handler(req, res);
  }
}


// const response = await fetch('http://localhost:3050/api/auth/sign-in/email', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     email: 'usuario@exemplo.com',
//     password: 'senha123',
//     callbackURL: 'http://localhost:3000/dashboard',
//   }),
// });

// const data = await response.json();
// if (data.error) {
//   console.error('Erro no login:', data.error.message);
// } else {
//   console.log('Login bem-sucedido:', data);
// }