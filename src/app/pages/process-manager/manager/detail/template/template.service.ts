import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';
import { endpoint } from "../../../../../../assets/config/endpoint";
@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    baseAPI = endpoint + '/redmine-jbpm-intergration/api/v1/'

    constructor(
        private http: HttpClient,
        private nbAuthService: NbAuthService
    ) {

    }

    getProcessTemplate(search, page, size) {
        return this.nbAuthService.getToken().pipe(
            switchMap(data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                    params: new HttpParams().set('page', page).set('size', size).set('search', JSON.stringify(search))
                };
                return this.http.get(this.baseAPI + 'process-template', httpOptions)
            })
        )
    }
    importTemplate(template) {
        return this.nbAuthService.getToken().pipe(
            switchMap(data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                };
                return this.http.post(this.baseAPI + 'process-template/import', template, httpOptions)
            })
        )
    }
    importBPMN(id, data) {
        let bpmn = { data: data, quytrinh2containerid: id }
        return this.nbAuthService.getToken().pipe(
            switchMap(data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                };
                return this.http.post(this.baseAPI + 'process-container/bpmn', bpmn, httpOptions)
            })
        )
    }
    updateProcessTemplate(data) {
        let template = {
            id: data.id,
            branch: data.branch,
            customField: data.customField,
            name: data.name,
            order: data.order,
            quytrinh2Container: { id: data.quytrinh2Container.id }
        }

        return this.nbAuthService.getToken().pipe(
            switchMap(data => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + data.getValue()
                    }),
                };
                return this.http.put(this.baseAPI + 'process-template', template, httpOptions)
            })
        )
    }


}