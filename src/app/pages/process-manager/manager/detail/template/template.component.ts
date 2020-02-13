import { Component, OnInit, Input } from '@angular/core';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { NbDialogRef, NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { TemplateService } from './template.service';
import { TemplatePreviewComponent } from './template-preview/template-preview.component';

@Component({
  selector: 'ngx-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  id: any
  unloaded = true
  list = [
    { title: 0, value: 0 },
    { title: 1, value: 1 }
  ]
  settings = {

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    actions: {
      add: false,
      delete: false,
      position: 'right',
    },
    columns: {
      name: {
        title: 'Template name',
        type: 'string',
      },
      order: {
        title: 'Order',
        type: 'number',
        width: '1vw'
      },
      branch: {
        title: 'Branch',
        width: '1vw',
        editor: {
          type: 'list',
          config: {
            list: this.list
          }
        },
        filter: {
          type: 'list',
          config: {
            list: this.list
          }
        },
        type: 'number'
      },
      customField: {
        title: 'Custom Field',
        type: 'string',
        valuePrepareFunction: (customField) => {
          if (customField.length > 50) return customField.split(/\s+/).slice(0, 10).join(" ") + ' ...'
          else return customField
        }
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    protected ref: NbDialogRef<TemplateComponent>,
    private templateService: TemplateService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,

  ) { }

  ngOnInit() {
    this.loadData()
  }
  ngOnDestroy(): void {
    console.log('thang');
    
    
  }
  cancel() {
    this.ref.close()
  }

  loadData() {
    let search = {
      quytrinh2Container: { id: this.id },
      order: 0
    }
    this.templateService.getProcessTemplate(search, 0, 1000).subscribe(
      data => {
        this.source.load(data['data'].content)
        this.unloaded = false
      }
    )
  }
  handleFileInput(event) {
    console.log(event);
    if (event.length > 0) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let text = e.target['result']
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(text.toString(), "text/xml");
        var userTasks = xmlDoc.getElementsByTagName("bpmn2:userTask");
        let tasks: Array<any> = [];

        for (let i = 0; i < userTasks.length; i++) {
          var task = {
            processContainerId: this.id,
            taskName: null,
            taskId: null,
            customField: ''
          }
          task.taskName = userTasks[i].getAttribute("name");
          task.taskId = userTasks[i].getAttribute("id");
          tasks.push(task);
        }
        this.dialogService.open(TemplatePreviewComponent, { context: { data: tasks, bpmn: text, id: this.id } }).onClose
          .subscribe(() => {
            this.unloaded = true
            this.loadData()
          })
      }
      reader.readAsText(event[0])
    }
  }
  filename: string;
  clear() {
    this.filename = '';
  }
  onEditConfirm(event) {
    this.unloaded = true;
    this.templateService.updateProcessTemplate(event.newData).subscribe(
      data => {
        if (data['code'] == 1) {
          this.unloaded = false
          event.confirm.resolve();
        } else {
          event.confirm.reject();
          this.toastrService.show(event.data.name, 'Update Error', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'danger' })
        }
      }
    )
  }
}
