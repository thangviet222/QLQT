import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';

@Injectable({
    providedIn: 'root'
})
export class AdministrationService {
    token
    constructor(private http: HttpClient,
        private nbAuthService: NbAuthService
    ) {
        this.nbAuthService.getToken().subscribe(data => this.token = data.getValue())
    }
    getUser() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer '+this.token
            }),
            params: new HttpParams().set('page','0').set('size','10').set('search','')
        };

        return this.http.get('http://localhost:8081/redmine-jbpm-intergration/api/v1/adm/users', httpOptions)
    }
}