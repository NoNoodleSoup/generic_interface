import { ChangeDetectionStrategy, Component, Input, OnInit, Output, SimpleChange } from '@angular/core';

import { PolymerElement } from '@vaadin/angular2-polymer';
import { Subscription }   from 'rxjs/Subscription';

import { QueryForm } from '../../models';
import { DataQueryService } from '../../services';
import { UiWrapperService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'query',
  templateUrl: 'query.component.html',
  styleUrls: ['query.component.css'],
  directives: [
    PolymerElement('paper-button'),
    PolymerElement('paper-dialog'),
    PolymerElement('paper-input'),
    PolymerElement('paper-time-picker'),
    PolymerElement('paper-tooltip'),
    PolymerElement('vaadin-date-picker'),
    PolymerElement('vaadin-combo-box')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryComponent implements OnInit {

  // @Input() entityObj: Object;
  @Input() tableName: string;

  comparisonOperators: Object[];
  condition: string;
  model: QueryForm;
  operatorValue: string;
  entityProperties: any;
  propertyDataType: string;
  propertyValue: string;
  testString: string;
  time: string;

  subscription: Subscription;

  constructor(private dataQueryService: DataQueryService, private uiWrapperService: UiWrapperService) {
      this.subscription = uiWrapperService.activeTable$.subscribe(
        x => {console.log(x);this.clearForm();}
      );
   }

  ngOnInit() {
    this.dataQueryService.entity$.subscribe(
      data => {
        this.entityProperties = data.Properties;
        this.model.dbTable = this.tableName;
      });
    this.model = new QueryForm('', 'WHERE', '', '', '');
    
  }

  // CAN PROBABLY REMOVE THIS CODE
  // ngOnChanges(change: { [tableName: string]: SimpleChange }) {
  //   // console.log(change['tableName'].currentValue);
  //   if (change['tableName'].currentValue !== null && (change['tableName'].currentValue !== change['tableName'].previousValue)) {
  //     this.clearForm();
  //   }
  // }

  clearForm() {
    this.propertyValue = '';
    this.operatorValue = '';
    this.condition = '';
    this.testString = '';
  }

  newQuery() {
    //this class property needs to be moved outside the component when finished
    this.comparisonOperators = [
      { operator: 'Is', value: '' },
      { operator: 'Is Not', value: '' },
      { operator: 'Like', value: '' },
      { operator: 'Less Than', value: '' },
      { operator: 'Less Than or Equal', value: '' },
      { operator: 'Greater Than', value: '' },
      { operator: 'Greater Than or Equal', value: '' },
      { operator: 'In', value: '' },
      { operator: 'Not In', value: '' },
      { operator: 'Is Null', value: '' },
      { operator: 'Is Not Null', value: '' }
    ];
  }

  openDialog() {
    if (this.propertyDataType === 'DateTime' || this.operatorValue) {
      var dialog: any = document.getElementById('dialog');
      if (dialog) {
        dialog.open();
      }
    }
  }

  submitQuery() {
    this.model.field = this.propertyValue;
    this.model.comparisonOperator = this.operatorValue;
    this.model.condition = this.condition;
    this.testString = JSON.stringify(this.model, null, '\t');
  }

}
