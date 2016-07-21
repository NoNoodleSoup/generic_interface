import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

import { ApiCallService } from '../services';
import { DbTable, Entity } from '../models'

@Injectable()
export class DataQueryService {

    //Public Observable containing Table names and the name of their entity 
    dbTables$: Observable<DbTable[]>;
    //Public Observable containing entity metadata
    entity$: Observable<Entity>;

    private currentEntity: Entity;
    private dbTables: DbTable[];
    private entity: Observer<Entity>;

    constructor(private apiCallService: ApiCallService) {
        this.dbTables$ = <Observable<DbTable[]>>apiCallService.getContext()
            .map(res => this.dbTables = <DbTable[]>res.json().DbTables);
        this.entity$ = new Observable<Entity>(observer => this.entity = observer).share();
    }

    getEntityMetaData(entity: string) {
        this.apiCallService.getEntityMetaData(entity).subscribe
            (res => {
                this.currentEntity = <Entity>res.json()[entity];
                this.entity.next(this.currentEntity);
            },
            error => console.error('error'));
    }
}
