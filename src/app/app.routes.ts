import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadComponent: () =>
      import('./user/user').then(m => m.UserComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home-component/home-component').then(m => m.HomeComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];