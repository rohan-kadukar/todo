import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/task-list/task-list.component')
      .then(m => m.TaskListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'form',
    loadComponent: () => import('./components/task-form/task-form.component')
      .then(m => m.TaskFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    loadComponent: () => import('./components/analytics/analytics.component')
      .then(m => m.AnalyticsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth/auth.component')
      .then(m => m.AuthComponent)
  }
];
