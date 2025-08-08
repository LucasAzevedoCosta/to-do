import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Put,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import * as nestjsBetterAuth from '@thallesp/nestjs-better-auth';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/create-task.dto ';

@Controller('tasks')
@UseGuards(nestjsBetterAuth.AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(
    @nestjsBetterAuth.Session() session: nestjsBetterAuth.UserSession,
  ) {
    const userId = session.user.id;
    const tasks = await this.taskService.getTasksByUser(userId);
    return tasks;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(
    @nestjsBetterAuth.Session() session: nestjsBetterAuth.UserSession,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const userId = session.user.id;
    const newTask = await this.taskService.createTask({
      ...createTaskDto,
      userId,
    });
    return newTask;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    if (!id) {
      throw new NotFoundException('ID não fornecido na URL');
    }
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTask(@Param('id') id: string) {
    if (!id) {
      throw new NotFoundException('ID não fornecido na URL');
    }
    return this.taskService.deleteTask(id);
  }
}
