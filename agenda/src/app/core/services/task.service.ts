import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly TASKS_STORAGE_KEY = 'tasks';
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedTasks = localStorage.getItem(this.TASKS_STORAGE_KEY);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.tasksSubject.next(this.tasks);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.TASKS_STORAGE_KEY, JSON.stringify(this.tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
    this.saveToLocalStorage();
  }

  updateTask(taskId: string, updates: Partial<Task>): void {
    const index = this.tasks.findIndex(task => task.id === taskId);    
    if (index !== -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        ...updates,
        updatedAt: new Date()
      };
      this.tasksSubject.next(this.tasks);
      this.saveToLocalStorage();
    }
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
    this.saveToLocalStorage();
  }

  searchTasks(query: string): Task[] {
    return this.tasks.filter(task => 
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description?.toLowerCase().includes(query.toLowerCase())
    );
  }
} 