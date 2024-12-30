import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { TaskCardComponent } from './shared/components/task-card/task-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskCreateComponent,
    TaskUpdateComponent,
    ErrorMessageComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    TaskCardComponent,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TasksModule { }
