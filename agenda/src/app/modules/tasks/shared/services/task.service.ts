import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { getStoredTasks, storeTasks } from './storage.helper';
import { Task } from '../../models/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localstorage:4200/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    const localTasks = getStoredTasks();
    return localTasks.length
      ? of(localTasks)
      : this.http.get<Task[]>(window.location.href).pipe(
          map((tasks) => {
            storeTasks(tasks);
            return tasks;
          }),
          catchError(() => of([]))
        );
  }

  deleteTask(id: string): void {
    const tasks = getStoredTasks().filter((task) => task.id !== id);
    storeTasks(tasks);
  }

  addTask(task: Task): void {
    const tasks = getStoredTasks();
    tasks.push(task);
    storeTasks(tasks);
  }
}
