import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';
  editingCategory: { id: string, name: string } | null = null;

  constructor(private categoryService: CategoryService) {}

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
    this.categoryService.deleteCategory(categoryId);
  }
} 