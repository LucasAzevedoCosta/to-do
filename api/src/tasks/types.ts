import { schema } from "src/db/schema";

export type TaskRow = typeof schema.task.$inferSelect;
export type NewTaskRow = typeof schema.task.$inferInsert;

export type TaskInput = {
  title: string;
  description: string;
  status: 'concluido' | 'nao_concluido';
  priority: 'urgente' | 'alta' | 'media' | 'baixa';
  startDate: Date;
  deadline: Date;
  userId: string;
};