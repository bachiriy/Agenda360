import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  categories: string[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(id: string): void {
    console.log(`Deleting task with ID: ${id}`);

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      }
    });
  }
  
}
