import { Component, OnInit } from '@angular/core';
import { NbAuthComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-authwrapper',
  templateUrl: './authwrapper.component.html',
  styleUrls: ['./authwrapper.component.scss']
})
export class AuthwrapperComponent extends NbAuthComponent implements OnInit {


  ngOnInit() {
  }

}
