import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule, AuthGuard } from '@thallesp/nestjs-better-auth';
import { auth } from './auth/auth';
import { TaskController } from './tasks/task.controller';
import { UserController } from './user/user.controller';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [AuthModule.forRoot(auth),TaskModule],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
