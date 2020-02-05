import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { NbDialogService } from '@nebular/theme';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  listUsers: any = []
  constructor(private adminService: AdministrationService,
  private dialogService: NbDialogService
    ) { }

  ngOnInit() {
    this.adminService.getUser().subscribe(data => {
      this.listUsers = data['data'].content
    })

  }
  openDialogAddUser(){
    this.dialogService.open(AddUserComponent)
  }

}
