import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessManagerService {

  token
  baseAPI = 'http://localhost:8081/redmine-jbpm-intergration/api/v1/'
  constructor(private http: HttpClient,
    private nbAuthService: NbAuthService) {
    this.nbAuthService.getToken().subscribe(data => this.token = data.getValue())
  }

  getProcessTime(page, size,source) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     'Authorization': 'Bearer ' + this.token
    //   }),
    //   params: new HttpParams().set('page', page).set('size', size)
    // };
    // return this.http.get(this.baseAPI + 'task/spendtime', httpOptions)
    this.nbAuthService.getToken().subscribe(
      data => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + data.getValue()
          }),
          params: new HttpParams().set('page', page).set('size', size)
        };
        return this.http.get(this.baseAPI + 'task/spendtime', httpOptions).subscribe(
          data =>{
            source.load(data['data'].content)
          }
        )
      }
    )
   
  }

  getProcessTimeDetails(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.http.get(this.baseAPI + 'task/' + id, httpOptions)
  }

  getProcessHistory(page, size) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + this.token
      }),
      params: new HttpParams().set('page', page).set('size', size).set('state', '')
    };
    return this.http.get(this.baseAPI + 'process/history', httpOptions)
  }

  getProcessHistoryTask(page, size, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + this.token
      }),
      params: new HttpParams().set('page', page).set('size', size).set('type', '')
    };
    return this.http.get(this.baseAPI + 'process/history/' + id + '/tasks', httpOptions)
  }
  getProcessManager(page, size) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + this.token
      }),
      params: new HttpParams().set('page', page).set('size', size).set('search', '')
    };
    return this.http.get(this.baseAPI + 'process/manager', httpOptions)
  }
  updateProcessManager(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + this.token
      }),
    };
    return this.http.put(this.baseAPI + 'process/manager', data, httpOptions)
  }

  deleteProcessManager(processID) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + this.token
      }),
      params: new HttpParams().set('entityIds', processID)
    };
    return this.http.delete(this.baseAPI + 'process/manager', httpOptions)
  }
  createProcessManager(process) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + this.token
      }),
    };
    return this.http.post(this.baseAPI + 'process/manager', process, httpOptions)
  }

}
