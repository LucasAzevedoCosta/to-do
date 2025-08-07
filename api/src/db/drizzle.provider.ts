import { Provider } from '@nestjs/common';
import { db as drizzleDb } from './drizzle';

export const DRIZZLE_DB = 'DRIZZLE_DB';

export const drizzleProvider: Provider = {
  provide: DRIZZLE_DB,
  useValue: drizzleDb,
};

// constructor(@Inject(DRIZZLE_DB) private readonly db: typeof drizzleDb) { }
