import { NgModule } from "@angular/core";
import { ProcessManagerComponent } from './process-manager.component';
import { TimeComponent } from './time/time.component';
import { ManagerComponent } from './manager/manager.component';
import { HistoryComponent } from './history/history.component';
import { ProjectIssueComponent } from './project-issue/project-issue.component';
import { ProcessManagerRoutingModule } from "./ProcessManagerRoutingModule.module";
import { ProcessManagerService } from './process-manager.service';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbIconModule, NbButtonModule, NbDialogModule, NbSpinnerModule, NbInputModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DetailsComponent } from './time/details/details.component';
import { TaskComponent } from './history/task/task.component';
import { DetailComponent } from './manager/detail/detail.component';
import { ManagerService } from './manager/manager.service';
import { TemplateComponent } from './manager/detail/template/template.component';
import { TemplateService } from './manager/detail/template/template.service';
import { TemplatePreviewComponent } from './manager/detail/template/template-preview/template-preview.component';

@NgModule({
    imports:[
        FormsModule,
        ThemeModule,
        NbDialogModule.forChild(),
        ProcessManagerRoutingModule,
        NbCardModule,
        Ng2SmartTableModule,
        NbIconModule,
        NbButtonModule,
        NbSpinnerModule,
        NbInputModule,
        NbCheckboxModule,
    ],
    declarations:[
        ProcessManagerComponent,
        TimeComponent,
        ManagerComponent,
        HistoryComponent,
        ProjectIssueComponent,
        DetailsComponent,
        TaskComponent,
        DetailComponent,
        TemplateComponent,
        TemplatePreviewComponent
    ],
    providers:[
        ProcessManagerService,
        ManagerService,
        TemplateService
    ],
    entryComponents:[
        DetailsComponent,
        TaskComponent,
        DetailComponent,
        TemplateComponent,
        TemplatePreviewComponent
    ]
})
export class ProcessManagerModule {}