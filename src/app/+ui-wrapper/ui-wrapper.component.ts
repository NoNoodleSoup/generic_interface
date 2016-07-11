import { Component, OnInit, SimpleChange, Input } from '@angular/core';

import { PolymerElement } from '@vaadin/angular2-polymer';

import { DataQueryService } from '../services';
import { QueryComponent } from './query';

@Component({
  moduleId: module.id,
  selector: 'ui-wrapper',
  templateUrl: 'ui-wrapper.component.html',
  styleUrls: ['ui-wrapper.component.css'],
  directives: [
    PolymerElement('vaadin-combo-box'),
    PolymerElement('paper-input'),
    QueryComponent
  ]
})
export class UiWrapperComponent implements OnInit {

  constructor(private dataQueryService: DataQueryService) { }

  tableMetadata: any;
  tableNames: string[];
  entityDescription: any;
  errorMessage: any;
  selectedTable: string;

  ngOnInit() {
    this.dataQueryService.getTables(true).subscribe(
      data => { this.tableMetadata = data, this.tableNames = Object.keys(data) },
      error => this.errorMessage = <any>error
    );
  }

  getEntity(entity: string) {
    this.dataQueryService.getEntity(entity).subscribe(
      data => this.entityDescription = data[entity].Description,
      error => this.errorMessage = <any>error
    )
  }

  onSelection(value) {
    this.getEntity(this.tableMetadata[value].Name);
    console.log("The Currently selected table is: " + value);
    console.log("The Currently selected entity is: " + this.tableMetadata[value].Name);
  }
}
