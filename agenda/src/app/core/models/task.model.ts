export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum Status {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
} 