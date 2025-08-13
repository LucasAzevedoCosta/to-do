import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DrizzleModule } from 'src/db/drizzle.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [DrizzleModule],
})
export class TaskModule {}
