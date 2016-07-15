import { Component, OnInit } from '@angular/core';

import { PolymerElement } from '@vaadin/angular2-polymer';

import { DataQueryService } from '../services';
import { QueryComponent } from './query';
import { MapToIterable } from '../shared';
import { Entity } from '../models'


@Component({
  moduleId: module.id,
  selector: 'ui-wrapper',
  templateUrl: 'ui-wrapper.component.html',
  styleUrls: ['ui-wrapper.component.css'],
  directives: [
    PolymerElement('vaadin-combo-box'),
    PolymerElement('paper-input'),
    QueryComponent
  ],
  pipes: [MapToIterable]
})
export class UiWrapperComponent implements OnInit {

  constructor(private dataQueryService: DataQueryService) { }

  tableNames: any;
  errorMessage: any;
  selectedItem: Object;
  selectedEntity: any;
  value: string;

  ngOnInit() {
    this.dataQueryService.dbTables$.subscribe(
      data => this.tableNames = data,
      error => this.errorMessage = <any>error
    );
    this.dataQueryService.entity$.subscribe(
      data => {
        this.selectedEntity = data;
      },
      error => this.errorMessage = <any>error
    );

  }

  getNewEntity(entityName) {
    if (entityName) {
      this.dataQueryService.getEntityMetaData(entityName.entity);
    }
  }
}
