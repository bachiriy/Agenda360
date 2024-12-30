import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'tasks', redirectTo: '/tasks', pathMatch: 'full'},
  { path: 'create', component: TaskCreateComponent },
  { path: 'update/:id', component: TaskUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
