import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsString } from 'class-validator';

export enum TaskStatus {
  Concluido = 'concluido',
  NaoConcluido = 'nao_concluido',
}

export enum TaskPriority {
  Urgente = 'urgente',
  Alta = 'alta',
  Media = 'media',
  Baixa = 'baixa',
}

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  deadline: Date;
}