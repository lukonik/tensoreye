import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (d) => d.DashboardComponent
      ),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./features/upload-page/upload-page.component').then(
        (e) => e.UploadPageComponent
      ),
  },
];
