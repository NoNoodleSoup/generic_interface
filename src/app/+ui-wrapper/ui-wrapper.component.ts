import { Component, OnInit } from '@angular/core';

import { PolymerElement } from '@vaadin/angular2-polymer';
import { MdCard } from '@angular2-material/card';

import { DataQueryService } from '../services';
import { DbTable, Entity } from '../models'
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
    PolymerElement('paper-input'),
    QueryComponent
  ],
  providers: [UiWrapperService]
})
export class UiWrapperComponent implements OnInit {

  constructor(private dataQueryService: DataQueryService, private uiWrapperService: UiWrapperService) { }

  errorMessage: any;
  // selectedEntity: Entity;
  selectedEntityName: string;
  selectedTable: DbTable;
  tableNames: DbTable[];

  ngOnInit() {
    this.dataQueryService.dbTables$.subscribe(
      data => this.tableNames = <DbTable[]>data,
      error => this.errorMessage = <any>error
    );
    
    // this.dataQueryService.entity$.subscribe(
    //   data => this.selectedEntity = <Entity>data,
    //   error => this.errorMessage = <any>error
    // );
  }

  getNewEntity(entityName: DbTable) {
    if (entityName) {
      this.uiWrapperService.setActiveTable(this.selectedTable.name);
      this.dataQueryService.getEntityMetaData(entityName.entity);
    }
  }
}
