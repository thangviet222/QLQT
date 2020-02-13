import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProcessManagerService } from '../process-manager.service';
import { NbDialogService } from '@nebular/theme';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'ngx-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

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
        type: 'number'
      },
      taskName: {
        title: 'Name',
        type: 'string'
      },
      starttime: {
        title: 'Start Time',
        type: 'string'
      },
      endtime: {
        title: 'End Time',
        type: 'string'
      },
      processtime: {
        title: 'Process Time',
        type: 'string'
      }
    }
  }
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private processManagerService: ProcessManagerService,
    private dialogService: NbDialogService
  ) {
    this.processManagerService.getProcessTime('0', '1000').subscribe(
      result => {
        this.source.load(result['data'].content)
      }
    )
    // console.log(this.processManagerService.getProcessTime(0, 1000));

  }

  ngOnInit() {
  }

  onCustomAction(event) {
    this.dialogService.open(DetailsComponent, { context: { process: event.data } })

  }

}
