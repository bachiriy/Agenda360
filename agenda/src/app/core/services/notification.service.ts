import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly NOTIFICATIONS_STORAGE_KEY = 'notifications';
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedNotifications = localStorage.getItem(this.NOTIFICATIONS_STORAGE_KEY);
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
      this.notificationsSubject.next(this.notifications);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.NOTIFICATIONS_STORAGE_KEY, JSON.stringify(this.notifications));
  }

  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  addNotification(taskId: string, message: string): void {
    const notification: Notification = {
      id: crypto.randomUUID(),
      taskId,
      message,
      isRead: false,
      createdAt: new Date()
    };

    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
    this.saveToLocalStorage();
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.notificationsSubject.next(this.notifications);
      this.saveToLocalStorage();
    }
  }

  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.notificationsSubject.next(this.notifications);
    this.saveToLocalStorage();
  }
} 