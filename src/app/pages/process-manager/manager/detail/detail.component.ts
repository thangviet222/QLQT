import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ManagerService } from '../manager.service';
import { NbDialogRef, NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { TemplateComponent } from './template/template.component';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id: any
  processname: any
  unloaded = true;
  list = [
    { title: 'Actived', value: 'actived' },
    { title: 'Deactivated', value: 'deactivated' },
  ];
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    actions: {
      custom: [
        { name: 'View', title: '<i class="nb-plus"></i>' }
      ],
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
        width: '1vw'
      },
      processDefinition: {
        title: 'Definition Id',
        type: 'string'
      },
      containerId: {
        title: 'Deployment',
        type: 'string'
      },
      status: {
        title: 'Status',
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
        type: 'string',
      }
    }
  }
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private managerService: ManagerService,
    protected ref: NbDialogRef<DetailComponent>,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,

  ) {
  }

  ngOnInit() {
    this.loadData()
  }
  loadData() {
    this.managerService.getProcessManagerDetails(0, 1000, this.id).subscribe(
      result => {
        this.source.load(result['data'].content)
        this.unloaded = false
      }
    )
  }
  cancel() {
    this.ref.close()
  }
  onCustomAction(event) {
    this.dialogService.open(TemplateComponent, { context: { id: event.data.id },backdropClass:'limit-height' })
  }
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.unloaded = true

      this.managerService.deleteContainer(event.data.id).subscribe(
        data => {
          if (data['code'] == 1) {
            this.loadData()
            this.unloaded = false
            event.confirm.resolve();
            this.toastrService.show(event.data.processDefinition, 'Delete Successfull', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'warning' })
          } else {
            event.confirm.reject();
            this.toastrService.show(event.data.processDefinition, 'Delete Error', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'danger' })
          }

        }
      )
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event) {
    this.unloaded = true
    let container = event.newData
    container.id = 0
    container.quyTrinh = { id: this.id }

    this.managerService.createContainer(container).subscribe(
      data => {
        if (data['code'] == 1) {
          this.loadData()
          this.unloaded = false
          event.confirm.resolve();
          this.toastrService.show(container.processDefinition, 'Created Successfull', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'success' })
        } else {
          event.confirm.reject();
          this.toastrService.show(container.processDefinition, 'Created Error', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'danger' })
        }

      }
    )
  }
  onEditConfirm(event) {
    this.unloaded = true
    let container = event.newData
    delete container.bpmn
    delete container.quyTrinh.name
    delete container.quyTrinh.description
    this.managerService.updateContainer(container).subscribe(
      data => {
        if (data['code'] == 1) {
          this.loadData()
          this.unloaded = false
          event.confirm.resolve();
          this.toastrService.show(container.processDefinition, 'Edit Successfull', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'success' })
        } else {
          event.confirm.reject();
          this.toastrService.show(container.processDefinition, 'Edit Error', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'danger' })
        }

      }
    )
  }
}
