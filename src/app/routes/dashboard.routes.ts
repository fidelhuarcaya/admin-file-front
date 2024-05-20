import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../pages/dashboard/components/list-documento/list-documento.component').then(m => m.ListDocumentoComponent)
    }

];