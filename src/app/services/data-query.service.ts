import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

import { ApiCallService } from '../services';
import { DbTable, Entity, Enum } from '../models'

@Injectable()
export class DataQueryService {

    //Public Observable containing Table names and the name of their entities 
    dbTables$: Observable<DbTable[]>;
    //Public Observable containing entity metadata
    entity$: Observable<Entity>;
    //Public Observable containing enum metadata
    enum$: Observable<Enum>;

    private dbTables: Observer<DbTable[]>;
    private entity: Observer<Entity>;
    private enum: any;

    constructor(private apiCallService: ApiCallService) {
        this.dbTables$ = new Observable<DbTable[]>(observer => this.dbTables = observer).share();
        this.entity$ = new Observable<Entity>(observer => this.entity = observer).share();
        this.enum$ = new Observable<Enum>(observer => this.enum = observer).share();
    }

    getContextMetaData() {
        this.apiCallService.getContextMetaData().subscribe(
            res => this.dbTables.next(<DbTable[]>res.json().DbTables),
            error => console.error('error')
        );
    }

    getEntityMetaData(entityName: string) {
        this.apiCallService.getEntityMetaData(entityName).subscribe(
            res => this.entity.next(<Entity>res.json()[entityName]),
            error => console.error('error')
        );
    }

    getEnumMetaData(enumName: string) {
        this.apiCallService.getEnumMetaData(enumName).subscribe(
            res => this.enum.next(<Enum>res.json()[enumName]),
            error => console.error('error')
        );
    }
}
