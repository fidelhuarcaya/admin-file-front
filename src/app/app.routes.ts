import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./routes/home.routes').then((m) => m.HomeRoutes),
    }, 
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./routes/dashboard.routes').then((m) => m.dashboardRoutes),
    },
];
