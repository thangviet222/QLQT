import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ProcessManagerService } from '../../process-manager.service';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  process: any;
  details: any;
  constructor(
    protected ref: NbDialogRef<DetailsComponent>,
    private processManagerService: ProcessManagerService
  ) {

  }

  ngOnInit() {
    this.processManagerService.getProcessTimeDetails(this.process.id).subscribe(
      data => {
        this.details = data['data']
      }
    )
  }

  cancel() {
    this.ref.close()
  }
}
