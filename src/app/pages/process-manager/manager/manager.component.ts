import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProcessManagerService } from '../process-manager.service';
import { NbToastrService, NbGlobalPhysicalPosition, NbDialogService } from '@nebular/theme';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'ngx-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  unloaded = true
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
        editable: false,
        addable: false,
        title: 'ID',
        type: 'number',
        width: '1vw'
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private processManagerService: ProcessManagerService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService

  ) {
    this.loadData()
  }

  ngOnInit() {
  }
  loadData() {
    this.processManagerService.getProcessManager(0, 1000).subscribe(
      data => {
        this.source.load(data['data'].content)
        this.unloaded = false
      }
    )
  }
  onFoo(event) {
    this.unloaded = true
    this.processManagerService.updateProcessManager(event.newData).subscribe(
      data => {
        if (data['code'] == 1) {
          event.confirm.resolve();
          this.unloaded = false;
          this.toastrService.show(event.newData.name, 'Update Successfull', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'success' })
        }
      }
    )
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.unloaded = true
      this.processManagerService.deleteProcessManager(event.data.id).subscribe(
        data => {
          if (data['code'] == 1) {
            event.confirm.resolve();
            this.unloaded = false;
            this.toastrService.show(event.data.name, 'Delete Successfull', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'success' })
          } else {
            event.confirm.reject();
          }
        }
      )
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event) {
    this.unloaded = true
    this.processManagerService.createProcessManager(event.newData).subscribe(
      data => {
        if (data['code'] == 1) {
          this.toastrService.show(event.newData.name, 'Create Successfull', { position: NbGlobalPhysicalPosition.TOP_RIGHT, status: 'success' })
          event.confirm.resolve();
          this.loadData()
          this.unloaded = false
        } else {
          event.confirm.reject();
        }
      }
    )

  }
  onCustomAction(event) {
    console.log(event);
       this.dialogService.open(DetailComponent,{context:{id:event.data.id}})
  }

}
