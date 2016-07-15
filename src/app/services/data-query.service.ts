import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

import { ApiCallService } from './api-call.service';
import { DbTable, Entity } from '../models'

@Injectable()
export class DataQueryService {

    //Public Observable containing Table names and the name of their entity 
    dbTables$: Observable<DbTable[]>;
    //Public Observable containing entity metadata
    entity$: Observable<{ Entity }>;

    private dbTables: Observer<DbTable[]>;
    private entity: Observer<{ Entity }>;
    private currentEntity: { Entity };

    constructor(private apiCallService: ApiCallService) {
        this.dbTables$ = apiCallService.getContext()
            .map(res => this.dbTables = res.json().DbTables);
        this.entity$ = new Observable<{ Entity }>(observer => this.entity = observer).share();
    }

    getEntityMetaData(entity: string) {
        //if currentEntity already exists, remove it, else add it.
        // if (this.currentEntity.filter(x => Object.keys(x)[0] === entity)[0]) {
        //     this.currentEntity = this.currentEntity.filter(x => Object.keys(x)[0] !== entity);
        // } else {

        
        this.apiCallService.getEntityMetaData(entity).subscribe
        (res => {
            this.currentEntity = res.json()[entity];
            this.entity.next(this.currentEntity);
        },
        error => console.error('error'))
        // subscriber
        //     .map(data => this.currentEntity = data.json())
        //     .map(x => console.log(x));
        //     console.log(this.currentEntity);
        // }

        // if (this.entity !== undefined) {
        //     this.entity.next(this.currentEntity);
        // }
    }
}
