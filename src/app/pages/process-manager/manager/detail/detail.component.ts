import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ManagerService } from '../manager.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id: any
  unloaded = false;

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    hideSubHeader: true,
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      processDefinition: {
        title: 'Process Definition',
        type: 'string'
      },
      containerId: {
        title: 'Container',
        type: 'string'
      },
      status: {
        title: 'Status',
        type: 'string'
      }
    }
  }
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private managerService: ManagerService,
    protected ref: NbDialogRef<DetailComponent>,

  ) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.loadData()
  }
  loadData() {
    this.managerService.getProcessManagerDetails(0, 1000, this.id, this.source)
  }
  cancel() {
    this.ref.close()
  }
}
