import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-administration',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AdministrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
