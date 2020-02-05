import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(protected ref : NbDialogRef<AddUserComponent>) { }

  ngOnInit() {
  }
  cancel(){
    this.ref.close()
  }
  submit(name){
    this.ref.close(name)
  }


}
