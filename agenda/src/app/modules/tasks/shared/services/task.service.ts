import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { getStoredTasks, storeTasks } from './storage.helper';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor() {}

  getTasks(): Observable<Task[]> {
    const localTasks = getStoredTasks();
    return localTasks.length ? of(localTasks) : of([]);
  }

  deleteTask(id: string): Observable<boolean> {
    const tasks = getStoredTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    
    if (tasks.length === updatedTasks.length) {
      return throwError(() => new Error('Task not found'));
    }
    
    storeTasks(updatedTasks);
    return of(true);
  }

  addTask(task: Task): Observable<boolean> {
    const tasks = getStoredTasks();

    const taskExists = tasks.some(
      (existingTask) => existingTask.id === task.id || existingTask.title === task.title
    );

    if (taskExists) {
      return throwError(() => new Error('Task with the same ID or title already exists'));
    }

    if (!task.id) {
      task.id = this.generateUniqueId();
    }

    tasks.push(task);
    storeTasks(tasks);

    return of(true);
  }

  updateTask(taskId: string, updatedTask: Task): Observable<boolean> {
    const tasks = getStoredTasks();
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index === -1) {
      return throwError(() => new Error('Task not found'));
    }

    tasks[index] = updatedTask;
    storeTasks(tasks);

    return of(true);
  }

  getTaskById(id: string): Observable<Task> {
    const tasks = getStoredTasks();
    const task = tasks.find((task) => task.id === id);
    
    if (!task) {
      return throwError(() => new Error('Task not found'));
    }
  
    return of(task);
  }
  

  private generateUniqueId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }
}
