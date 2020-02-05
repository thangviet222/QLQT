import { Component, OnInit } from '@angular/core';
import { ProcessManagerService } from '../../process-manager.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  id: any
  loaded=true;

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    hideSubHeader: true,
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      processDefinitionId: {
        title: 'Process Definition',
        type: 'string'
      },
      status: {
        title: 'Status',
        type: 'string'
      },
      createdOn: {
        title: 'Create Date',
        type: 'string'
      }
    }
  }
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private processManagerService: ProcessManagerService,
    protected ref: NbDialogRef<TaskComponent>,

  ) { }

  ngOnInit() {
    this.processManagerService.getProcessHistoryTask(0, 1000, this.id).subscribe(
      data => {
        console.log(data);
        this.source.load(data['data'].content)
        this.loaded=false;
      }
    )
  }
  cancel(){
    this.ref.close();
  }

}
