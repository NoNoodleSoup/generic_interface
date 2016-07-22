import { Component, OnInit } from '@angular/core';

import { QueryFilterComponent } from './query-filter/'

@Component({
  moduleId: module.id,
  selector: 'query',
  templateUrl: 'query.component.html',
  styleUrls: ['query.component.css'],
  directives: [ QueryFilterComponent ]
})
export class QueryComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
