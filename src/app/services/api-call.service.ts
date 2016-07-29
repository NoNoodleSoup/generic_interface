import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiCallService {

  constructor(private http: Http) { }

  private apiBaseUrl: string =
  'http://localhost:50657/api/'
  //'http://ntserver2:8085/api/'

  getContextMetaData(): Observable<Response> {
    return this.http.get(this.apiBaseUrl + 'MetaData/GetContextMetaData')
      .catch(this.handleError);
  }

  getEntityMetaData(entityName: string): Observable<Response> {
    return this.http.get(this.apiBaseUrl + 'MetaData/GetEntityMetaData/' + entityName)
      .catch(this.handleError);
  }

  getEnumMetaData(enumName: string): Observable<Response> {
    return this.http.get(this.apiBaseUrl + 'MetaData/GetEnumMetadata/' + enumName)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg: string = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
