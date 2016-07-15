import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'query',
  templateUrl: 'query.component.html',
  styleUrls: ['query.component.css']
})
export class QueryComponent implements OnInit {

  @Input() entityObj: Object = {};
  name: string;

  constructor() { }

  getName() {
    console.log(this.entityObj);
  }

  ngOnChanges(){
    // this.name = Object.keys(this.entityObj)[0];
    // console.log(name);
  }

  ngOnInit() {
  }

}
