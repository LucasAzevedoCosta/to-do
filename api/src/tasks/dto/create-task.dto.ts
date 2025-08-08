import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['concluido', 'nao_concluido'])
  status: 'concluido' | 'nao_concluido';

  @IsEnum(['urgente', 'alta', 'media', 'baixa'])
  priority: 'urgente' | 'alta' | 'media' | 'baixa';

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  deadline: Date;
}