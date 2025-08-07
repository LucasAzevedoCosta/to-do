import { Controller, Get, UseGuards } from '@nestjs/common';
import * as nestjsBetterAuth from '@thallesp/nestjs-better-auth';

@Controller('users')
@UseGuards(nestjsBetterAuth.AuthGuard)
export class UserController {
  @Get('me')
  async getProfile(@nestjsBetterAuth.Session() session: nestjsBetterAuth.UserSession) {
    return { user: session.user };
  }
}
