import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule, AuthGuard  } from '@thallesp/nestjs-better-auth';
import { auth } from './auth/auth';

@Module({
  imports: [AuthModule.forRoot(auth)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
