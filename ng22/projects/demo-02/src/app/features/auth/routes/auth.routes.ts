import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    redirectTo: 'login/td',
    pathMatch: 'full',
  },
  {
    path: 'login/:formType',
    title: 'Login | Demo 02',
    loadComponent: () => import('../pages/login-page'),
  },
  {
    path: 'register',
    title: 'Registro | Demo 02',
    loadComponent: () => import('../pages/register-page'),
  },
];
