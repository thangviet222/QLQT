import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';
import { endpoint } from "../../../../assets/config/endpoint";
@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    baseAPI = endpoint + '/redmine-jbpm-intergration/api/v1/'

    constructor(
        private http: HttpClient,
        private nbAuthService: NbAuthService
    ) {

    }
    getProcessManagerDetails(page, size, id) {
        const search = {
            quyTrinh: { id: id },
            status: null
        }
        return this.nbAuthService.getToken().pipe(
            switchMap(data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                    params: new HttpParams().set('page', page).set('size', size).set('search', JSON.stringify(search))
                };
                return this.http.get(this.baseAPI + 'process-container', httpOptions)
            })
        )
    }
    createContainer(container) {
        return this.nbAuthService.getToken().pipe(
            switchMap(data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                };
                return this.http.post(this.baseAPI + 'process-container', container, httpOptions)
            })
        )
    }
    deleteContainer(id) {
        return this.nbAuthService.getToken().pipe(
            switchMap(data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                    params: new HttpParams().set('entityIds', id)
                };
                return this.http.delete(this.baseAPI + 'process-container', httpOptions)
            })
        )
    }
    updateContainer(container) {
        return this.nbAuthService.getToken().pipe(
            switchMap(data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                };
                return this.http.put(this.baseAPI + 'process-container', container, httpOptions)
            })
        )
    }
}