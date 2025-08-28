import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DrizzleModule } from 'src/db/drizzle.module';
import { TASK_REPOSITORY } from './task.repository';
import { DrizzleTaskRepository } from './task.repository.drizzle';

@Module({
  imports: [DrizzleModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    { provide: TASK_REPOSITORY, useClass: DrizzleTaskRepository },
  ],
  exports: [TaskService, TASK_REPOSITORY], // exporte se outro módulo for usar
})
export class TaskModule {}
