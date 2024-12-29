import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule) },
    { path: 'categories', loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule) }
];
  