import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { TaskService } from '../../../core/services/task.service';
import { Category } from '../../../core/models/category.model';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  newCategoryName: string = '';
  editingCategory: { id: string, name: string } | null = null;

  constructor(private categoryService: CategoryService, private taskService: TaskService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  startEdit(category: Category): void {
    this.editingCategory = { id: category.id, name: category.name };
  }

  cancelEdit(): void {
    this.editingCategory = null;
  }

  updateCategory(): void {
    if (this.editingCategory && this.editingCategory.name.trim()) {
      this.categoryService.updateCategory(this.editingCategory.id, this.editingCategory.name.trim());
      this.editingCategory = null;
    }
  }

  addCategory(): void {
    if (this.newCategoryName.trim()) {
      try {
        this.categoryService.addCategory(this.newCategoryName.trim());
        this.newCategoryName = '';
      } catch (error) {
        alert('Category already exists!');
      }
    }
  }

  deleteCategory(categoryId: string): void {
    this.taskService.getTasks().subscribe(tasks => {
      let associatedTasks = tasks.filter(task => task.categoryId === categoryId);
      associatedTasks.forEach(task => this.taskService.deleteTask(task.id));
    })
    this.categoryService.deleteCategory(categoryId);
  }

  associatedTasks: Task[] = [];

  categoryDetails: {id: string} | null = null;

  showAssociatedTasks(id: string) {
    console.log(id);
    
    this.categoryDetails = this.categoryDetails ? null : {id: id};

    this.taskService.getTasks().subscribe(tasks => {
      this.associatedTasks = tasks.filter(task => task.categoryId == id);
    });
  }
} 