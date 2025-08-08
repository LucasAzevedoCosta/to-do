import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

export const DRIZZLE_DB = 'DRIZZLE_DB';

export const drizzleProvider: Provider = {
  provide: DRIZZLE_DB,
  useFactory: () => {
    const url = process.env.DATABASE_URL!;
    const sql = neon(url);
    return drizzle({ client: sql, schema });
  },
};
