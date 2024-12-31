export interface Notification {
  id: string;
  taskId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
} 