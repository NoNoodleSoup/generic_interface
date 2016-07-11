import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiCallService } from './api-call.service';

@Injectable()
export class DataQueryService {

    constructor(private apiCallService: ApiCallService) { }

    getTables() {
        return this.apiCallService.getContext().map(res => res.json().TableDictionary)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
