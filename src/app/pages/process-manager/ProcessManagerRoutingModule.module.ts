import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { ProcessManagerComponent } from './process-manager.component';
import { TimeComponent } from './time/time.component';
import { ManagerComponent } from './manager/manager.component';
import { HistoryComponent } from './history/history.component';
import { ProjectIssueComponent } from './project-issue/project-issue.component';

export const routes: Routes = [{
    path: '',
    component: ProcessManagerComponent,
    children: [
        {
            path: 'time',
            component: TimeComponent
        },
        {
            path: 'manager',
            component: ManagerComponent
        },
        {
            path: 'history',
            component: HistoryComponent
        },
        {
            path: 'project-issue',
            component: ProjectIssueComponent
        },
        {
            path: '',
            redirectTo: 'time',
            pathMatch: 'full',
        }
    ]
}]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProcessManagerRoutingModule {
}
