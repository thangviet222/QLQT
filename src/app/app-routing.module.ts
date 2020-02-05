import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbLogoutComponent,
} from '@nebular/auth';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { AuthwrapperComponent } from './authwrapper/authwrapper.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: AuthwrapperComponent,
    children: [
      {
        path: '',
        component: LoginAuthComponent,
      },
      {
        path: 'login',
        component: LoginAuthComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      }
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
