import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiCallService } from './api-call.service';

@Injectable()
export class DataQueryService {

    private dbTables$: Observable<any[]>

    constructor(private apiCallService: ApiCallService) {
        this.dbTables$ = apiCallService.getContext(true)
        .map(res => res.json().TableDictionary);
     }

    getTables() {
        return this.dbTables$;
    }

    getEntity(entity: string) {
        return this.apiCallService.getEntity(entity)
    }

}
