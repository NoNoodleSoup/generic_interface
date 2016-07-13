import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiCallService {

  constructor(private http: Http) { }

  private apiBaseUrl =
  //'http://localhost:50657/api/'
  'http://ntserver2:8085/api/'

  getContext(details: boolean = false): Observable<Response> {
    return this.http.get(this.apiBaseUrl + 'MetaData/GetContextMetaData?details=' + details).catch(this.handleError);
  }

  getEntity(entity: string): Observable<Response> {
    return this.http.get(this.apiBaseUrl + 'MetaData/GetEntityMetaData/' + entity)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
