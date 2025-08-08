import { Module } from "@nestjs/common";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/neon-http";
import { AuthService } from "./auth.service";

@Module({
  providers: [
    AuthService,
    {
      provide: 'DB',
      useFactory: () => drizzle,
    },
    {
      provide: 'AUTH',
      useFactory: (db) =>
        betterAuth({
          database: drizzleAdapter(db, { provider: 'pg' }),
          emailAndPassword: { enabled: true },
        }),
      inject: ['DB'],
    },
  ],
  exports: ['AUTH'],
})
export class AuthModule {}