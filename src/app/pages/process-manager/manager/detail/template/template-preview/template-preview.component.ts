import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogRef } from '@nebular/theme';
import { TemplateService } from '../template.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss']
})
export class TemplatePreviewComponent implements OnInit {
  data: any
  bpmn: any
  id: any
  unloaded = false
  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
      position: 'right',
    },
    pager: {
      perPage: 12
    },
    columns: {
      taskName: {
        title: 'Task Name',
        type: 'string',
        filter: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    protected ref: NbDialogRef<TemplatePreviewComponent>,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    this.source.load(this.data)
  }
  cancel() {
    this.ref.close();
  }
  saveTemplate() {
    this.unloaded = true
    forkJoin(
      this.templateService.importTemplate(this.data),
      this.templateService.importBPMN(this.id, this.bpmn)
    ).subscribe(
      result => {
        if (result[0]['code'] == 1 && result[1]['code'] == 1) {
          this.ref.close()
        }
      }
    )
  }
  uploadedFile() {
    return this.data.length > 0
  }

}
