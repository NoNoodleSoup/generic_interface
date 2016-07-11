import { Component, OnInit, SimpleChange, Input } from '@angular/core';

import { PolymerElement } from '@vaadin/angular2-polymer';

import { DataQueryService } from '../services';

@Component({
  moduleId: module.id,
  selector: 'ui-wrapper',
  templateUrl: 'ui-wrapper.component.html',
  styleUrls: ['ui-wrapper.component.css'],
  directives: [
    PolymerElement('vaadin-combo-box'),
    PolymerElement('paper-input')
  ]
})
export class UiWrapperComponent implements OnInit {

  constructor(private dataQueryService: DataQueryService) { }

  tableMetadata: any;
  tableNames: string[];
  entityName: string;
  errorMessage: any;
  selectedTable: string;

  ngOnInit() {
    this.dataQueryService.getTables(true).subscribe(
      data => { this.tableMetadata = data, this.tableNames = Object.keys(data) },
      error => this.errorMessage = <any>error
    );
  }

  testQuery(entity: string) {
    this.dataQueryService.getEntities(entity).subscribe(
      data => this.entityName = Object.keys(data)[0],
      error => this.errorMessage = <any>error
    )
  }

  test(value) {
    this.testQuery(this.tableMetadata[value].Name);
    console.log("The Currently selected table is: " + value);
    console.log("The Currently selected entity is: " + this.tableMetadata[value].Name);
  }
}
