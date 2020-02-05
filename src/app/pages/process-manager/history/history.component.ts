import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProcessManagerService } from '../process-manager.service';
import { NbDialogService } from '@nebular/theme';
import { TaskComponent } from './task/task.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  loaded = true;
  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
      custom: [
        { name: 'View', title: '<i class="nb-plus"></i>' }
      ],
      position: 'right'
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '1vw'
      },
      processName: {
        title: 'Name',
        type: 'string'
      },
      processInstanceDescription: {
        title: 'Description',
        type: 'string'
      },
      processVersion: {
        title: 'Version',
        type: 'string'
      },
      date: {
        title: 'Date',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = this.datePipe.transform(raw, 'd MMMM y, H:mm');
          return formatted;
        }
      },
      state: {
        title: 'state',
        valuePrepareFunction: (state) => {
          switch (state) {
            case 0:
              return 'Pending'
            case 1:
              return 'Active'
            case 2:
              return 'Completed'
            case 3:
              return 'Aborted'
            case 4:
              return 'Suspended'
          }
        }
      }
    }
  }
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private processManagerService: ProcessManagerService,
    private dialogService: NbDialogService,
    private datePipe: DatePipe

  ) {
    this.processManagerService.getProcessHistory(0, 1000).subscribe(
      data => {
        this.source.load(data['data'].content)
        this.loaded = false
      }
    )
  }

  ngOnInit() {
  }
  onCustomAction(event) {
    this.dialogService.open(TaskComponent, { context: { id: event.data.id } })
  }

}
