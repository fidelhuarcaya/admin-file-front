import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/components/home/home.component';

export const HomeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../pages/home/components/home/home.component').then(m => m.HomeComponent)
    }
];
