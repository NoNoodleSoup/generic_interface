import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'query',
  templateUrl: 'query.component.html',
  styleUrls: ['query.component.css']
})
export class QueryComponent implements OnInit {
@Input('entity') entityDescription;
  constructor() {}

  ngOnInit() {
  }

}
