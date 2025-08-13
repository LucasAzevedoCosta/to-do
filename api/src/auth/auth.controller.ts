import { Controller, All, Req, Res } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH') private auth: ReturnType<typeof betterAuth>) {}

  @All('api/auth/*')
  async betterAuthHandler(@Req() req: Request, @Res() res: Response) {
    const handler = toNodeHandler(this.auth);
    return handler(req, res);
  }
}
