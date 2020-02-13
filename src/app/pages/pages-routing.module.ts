import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'administration',
      loadChildren: () => import('./administration/administration.module')
      .then(m => m.AdministratorModule)
    },
    {
      path: 'process',
      loadChildren: () => import('./process-manager/process-manager.module')
      .then(m => m.ProcessManagerModule)
    },
    {
      path: '',
      redirectTo: 'administration',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
