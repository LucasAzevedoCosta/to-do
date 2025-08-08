import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_DB } from 'src/db/drizzle.provider';
import * as schema from 'src/db/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: any,
  ) {}

  async getUserById(userId: string) {
    const users = await this.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, userId));
    const u = users[0];
    return {
      name: u.name,
      email: u.email,
      createdAt: u.createdAt,
    };
  }
}
