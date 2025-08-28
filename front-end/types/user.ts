export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  createdAt: string;
  image?: string;
  completedTasksCount?: number;
  tags?: string[];
}