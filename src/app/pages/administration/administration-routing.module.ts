import { Routes, RouterModule } from "@angular/router";
import { AdministrationComponent } from './administration.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { RightComponent } from './right/right.component';
import { ApiComponent } from './api/api.component';
import { AccessComponent } from './access/access.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{
    path: '',
    component: AdministrationComponent,
    children: [
        {
            path: 'user',
            component: UserComponent
        },
        {
            path: 'role',
            component: RoleComponent
        },
        {
            path: 'right',
            component: RightComponent
        },
        {
            path: 'api',
            component: ApiComponent
        },
        {
            path: 'access',
            component: AccessComponent
        },
        {
            path: '',
            redirectTo: 'user',
            pathMatch: 'full',
        }
    ]
}]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministrationRoutingModule { }