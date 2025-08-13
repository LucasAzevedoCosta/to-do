import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from 'src/db/drizzle';
import { schema } from 'src/db/schema';

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:3000'],
  baseURL: 'http://localhost:3001/api/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
});
