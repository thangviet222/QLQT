import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { endpoint } from "../../../assets/config/endpoint";
@Injectable({
    providedIn: 'root'
})
export class AdministrationService {
    token
    baseApi = endpoint + '/redmine-jbpm-intergration/api/v1'
    constructor(private http: HttpClient,
        private nbAuthService: NbAuthService
    ) {
        this.nbAuthService.getToken().subscribe(data => this.token = data.getValue())
    }
    getUser() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + this.token
            }),
            params: new HttpParams().set('page', '0').set('size', '10').set('search', '')
        };

        return this.http.get(this.baseApi + '/adm/users', httpOptions)
    }
}