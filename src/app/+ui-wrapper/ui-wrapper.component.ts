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

  tables: string[];
  errorMessage: any;
  selectedTable: string;

  ngOnInit() {
    this.dataQueryService.getTables().subscribe(
      data => this.tables = Object.keys(data),
      error => this.errorMessage = <any>error
    );
  }

}
