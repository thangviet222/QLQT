import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-process-manager',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class ProcessManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
