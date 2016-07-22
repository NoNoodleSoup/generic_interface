import { Component, OnInit } from '@angular/core';

import { PolymerElement } from '@vaadin/angular2-polymer';
import { MdCard } from '@angular2-material/card';

import { DataQueryService } from '../services';
import { DbTable } from '../models'
import { UiWrapperService } from './shared';
import { QueryComponent } from './query';


@Component({
  moduleId: module.id,
  selector: 'ui-wrapper',
  templateUrl: 'ui-wrapper.component.html',
  styleUrls: ['ui-wrapper.component.css'],
  directives: [
    MdCard,
    PolymerElement('vaadin-combo-box'),
    QueryComponent
  ],
  providers: [ UiWrapperService ]
})
export class UiWrapperComponent implements OnInit {
  errorMessage: any;
  selectedEntityName: string;
  selectedTable: DbTable;
  tableNames: DbTable[];

  constructor(private dataQueryService: DataQueryService, private uiWrapperService: UiWrapperService) { }

  ngOnInit() {
    this.dataQueryService.dbTables$.subscribe(
      data => this.tableNames = <DbTable[]>data,
      error => this.errorMessage = <any>error
    );
  }

  getNewEntity(entityName: DbTable) {
    if (entityName) {
      this.uiWrapperService.setActiveTable(this.selectedTable.name);
      this.dataQueryService.getEntityMetaData(entityName.entity);
    }
  }
}
