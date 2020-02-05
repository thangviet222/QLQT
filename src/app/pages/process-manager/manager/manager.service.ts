import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    baseAPI = 'http://localhost:8081/redmine-jbpm-intergration/api/v1/'

    constructor(
        private http: HttpClient,
        private nbAuthService: NbAuthService
    ) {

    }
    getProcessManagerDetails(page, size, id, source) {
        const search = {
            quyTrinh: { id: id },
            status: null
        }
        this.nbAuthService.getToken().subscribe(
            data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                    params: new HttpParams().set('page', page).set('size', size).set('search', JSON.stringify(search))
                };
                this.http.get(this.baseAPI + 'process-container', httpOptions).subscribe(
                    data => {

                        source.load(data['data'].content)

                    }
                )
            }
        )
    }
}