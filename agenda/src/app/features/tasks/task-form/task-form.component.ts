import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { CategoryService } from '../../../core/services/category.service';
import { Priority, Status } from '../../../core/models/task.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  categories: Category[] = [];
  priorities = Object.values(Priority);
  statuses = Object.values(Status);
  isEditMode = false;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const currentDate = new Date();
    
    this.taskForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.maxLength(100),
        Validators.minLength(3)
      ]],
      description: ['', [
        Validators.maxLength(500)
      ]],
      dueDate: ['', [
        Validators.required,
        (control: AbstractControl) => {
          const date = new Date(control.value);
          return date < currentDate ? { pastDate: true } : null;
        }
      ]],
      priority: [Priority.MEDIUM, Validators.required],
      categoryId: ['', Validators.required],
      status: [Status.TODO, Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = params['id'];
        this.loadTask(params['id']);
      }
    });
  }

  private loadTask(taskId: string): void {
    this.taskService.getTasks().subscribe(tasks => {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        this.taskForm.patchValue({
          ...task,
          dueDate: new Date(task.dueDate).toISOString().slice(0, 16)
        });
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, formValue);
      } else {
        this.taskService.addTask(formValue);
      }
      
      this.router.navigate(['/tasks']);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.taskForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
      if (control.errors['maxlength']) return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
      if (control.errors['minlength']) return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['pastDate']) return 'Due date cannot be in the past';
    }
    return '';
  }
} 