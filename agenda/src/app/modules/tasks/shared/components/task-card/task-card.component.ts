import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-card',
  standalone: false,
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input() task: Task = {};
  @Input() deleteTask: (id: string) => void = () => {};
}
