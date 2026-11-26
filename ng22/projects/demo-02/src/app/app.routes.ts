import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';
import { TimeService } from './core/services/time.service';
import { authRoutes } from './features/auth/routes/auth.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Inicio | Demo 02',
    data: {
      label: 'Inicio',
    },
    loadComponent: () => import('./features/home/home-page'),
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Demo 02',
    data: {
      label: 'Dashboard',
    },
    loadComponent: () => import('./features/dashboard/dashboard-page'),
    providers: [TimeService],
  },
  {
    path: 'courses',
    title: 'Cursos | Demo 02',
    data: {
      label: 'Cursos',
    },
    loadComponent: () => import('./features/courses/courses-page'),
  },
  {
    path: 'about',
    title: 'Nosotros | Demo 02',
    data: {
      label: 'Nosotros',
    },
    loadComponent: () => import('./features/about/about-page'),
  },
  {
    path: 'auth',
    children: authRoutes,
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];

export const MENU_OPTIONS: MenuOption[] = routes
  .filter((route) => !!route.data?.['label'])
  .map((route) => ({
    label: route.data?.['label'] as string,
    path: route.path as string,
  }));
