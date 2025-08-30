import { Module } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { AuthService } from './auth.service';
import { db } from 'src/db/drizzle';

@Module({
  providers: [
    AuthService,
    { provide: 'DB', useValue: db },
    {
      provide: 'AUTH',
      useFactory: (dbConn) =>
        betterAuth({
          baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',

          socialProviders: {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID!,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            },
          },
          emailAndPassword: { enabled: true },

          cookies: {
            domain: 'localhost',
            secure: false,
            sameSite: 'lax',
          },
          trustedOrigins: ['http://localhost:3000'],

          database: drizzleAdapter(dbConn, { provider: 'pg' }),
        }),
      inject: ['DB'],
    },
  ],
  exports: ['AUTH'],
})
export class AuthModule {}
