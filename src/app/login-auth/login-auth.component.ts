import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthResult } from '@nebular/auth';

@Component({
  selector: 'ngx-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent extends NbLoginComponent implements OnInit {


  ngOnInit() {
  }
  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    var formData: any = new FormData();
    formData.append("username", this.user.username);
    formData.append("password", this.user.password);

    this.service.authenticate(this.strategy, formData).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      console.log(result)
      if (result.getResponse().body.statusCode == 200) {
        this.messages = result.getMessages();
      } else {
        this.errors = ['Please check your information '];
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

}
