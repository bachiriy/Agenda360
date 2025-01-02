import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { CategoryService } from '../../../core/services/category.service';
import { Task, Priority, Status } from '../../../core/models/task.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];
  searchQuery: string = '';
  Status = Status;
  selectedCategory: string = '';

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          task.description?.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || task.categoryId === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.filterTasks();
  }

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory = select.value;
    this.filterTasks();
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find(cat => cat.id === categoryId)?.name || '';
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  cycleTaskStatus(taskId: string, currentStatus: Status): void {
    let newStatus: Status;
    
    switch(currentStatus) {
      case Status.TODO:
        newStatus = Status.DOING;
        break;
      case Status.DOING:
        newStatus = Status.DONE;
        break;
      case Status.DONE:
        newStatus = Status.TODO;
        break;
      default:
        newStatus = Status.TODO;
    }

    this.taskService.updateTask(taskId, { status: newStatus });
  }
} 