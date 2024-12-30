import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-task-update',
  standalone: false,
  templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
  taskForm: FormGroup;
  errType: 'error' | 'success' | 'warning' = 'error';
  errIsOn: boolean = false;
  errMessage: string = '';
  taskId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      priority: ['LOW', Validators.required],
      status: ['TODO', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') as string;

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          category: task.category,
          description: task.description,
          priority: task.priority,
          status: task.status,
        });
      },
      error: (err) => {
        this.errMessage = 'Error loading task details.';
        this.errIsOn = true;
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.errMessage = 'Please fill in all fields correctly.';
      this.errIsOn = true;
      return;
    }

    this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.errMessage = 'Error updating the task.';
        this.errIsOn = true;
      },
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.taskForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required.`;
    }
    if (control?.hasError('maxlength')) {
      return `${controlName} is too long.`;
    }
    return '';
  }
}
