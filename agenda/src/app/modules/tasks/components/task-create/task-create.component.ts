import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../shared/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-task-create',
  standalone: false,
  templateUrl: './task-create.component.html',
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  errIsOn: boolean = false;
  errMessage: string = '';
  errType: 'warning' | 'error' | 'success' = 'success';

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(70)]],
      description: ['', [Validators.required, Validators.maxLength(400)]],
      priority: ['LOW'],
      status: ['DOING'],
      category: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this.taskService
        .addTask(newTask)
        .pipe(
          tap({
            next: (response) => {
              this.setErrorMessage('Task successfully saved!', 'success');
            },
            error: (response) => {
              this.setErrorMessage('Error saving task! ' + response, 'error');
            },
          })
        )
        .subscribe();
    } else {
      this.setErrorMessage('Please correct the errors in the form.', 'warning');
    }
  }

  setErrorMessage(message: string, type: 'warning' | 'error' | 'success') {
    this.errMessage = message;
    this.errType = type;
    this.errIsOn = true;
    setTimeout(() => {
      this.errIsOn = false;
    }, 3000);
  }

  getErrorMessage(field: string): string | null {
    const control = this.taskForm.get(field);
    if (control?.hasError('required')) return `${field} is required`;
    if (control?.hasError('maxLength')) return `${field} is too long`;
    return null;
  }
}
