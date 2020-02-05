import { NgModule } from "@angular/core";
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { RightComponent } from './right/right.component';
import { ApiComponent } from './api/api.component';
import { AccessComponent } from './access/access.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule, NbCardModule, NbDialogModule, NbInputModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AdministrationService } from './administration.service';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        FormsModule,
        ThemeModule,
        AdministrationRoutingModule,
        CommonModule,
        NbEvaIconsModule,
        NbButtonModule,
        NbIconModule,
        NbCardModule,
        NbDialogModule.forChild(),
        NbInputModule,
        NbSelectModule,
        NbCheckboxModule
    ],
    declarations: [
        UserComponent,
        RoleComponent,
        RightComponent,
        ApiComponent,
        AccessComponent,
        AdministrationComponent,
        AddUserComponent
    ],
    entryComponents:[
        AddUserComponent
    ],
    providers:[
        AdministrationService
    ]
})
export class AdministratorModule {}