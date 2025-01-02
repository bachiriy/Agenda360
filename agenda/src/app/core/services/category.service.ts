import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly CATEGORIES_STORAGE_KEY = 'categories';
  private categories: Category[] = [];
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedCategories = localStorage.getItem(this.CATEGORIES_STORAGE_KEY);
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
      this.categoriesSubject.next(this.categories);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.CATEGORIES_STORAGE_KEY, JSON.stringify(this.categories));
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  addCategory(name: string): void {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (this.categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {      
      throw new Error('Category already exists');
    }

    this.categories.push(newCategory);
    this.categoriesSubject.next(this.categories);
    this.saveToLocalStorage();
  }

  updateCategory(categoryId: string, name: string): void {
    const index = this.categories.findIndex(cat => cat.id === categoryId);
    if (index !== -1) {
      this.categories[index] = {
        ...this.categories[index],
        name,
        updatedAt: new Date()
      };
      this.categoriesSubject.next(this.categories);
      this.saveToLocalStorage();
    }
  }

  deleteCategory(categoryId: string): void {
    this.categories = this.categories.filter(cat => cat.id !== categoryId);
    this.categoriesSubject.next(this.categories);
    this.saveToLocalStorage();
  }
} 