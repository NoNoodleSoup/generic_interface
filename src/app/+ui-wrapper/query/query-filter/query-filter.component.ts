import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { PolymerElement } from '@vaadin/angular2-polymer';
import { Subscription }   from 'rxjs/Subscription';

import { DataQueryService } from '../../../services';
import { QueryForm } from '../../../models';
import { UiWrapperService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'query-filter',
  templateUrl: 'query-filter.component.html',
  styleUrls: ['query-filter.component.css'],
  directives: [
    PolymerElement('paper-button'),
    PolymerElement('paper-dialog'),
    PolymerElement('paper-input'),
    PolymerElement('paper-time-picker'),
    PolymerElement('vaadin-date-picker'),
    PolymerElement('vaadin-combo-box')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryFilterComponent implements OnInit {

  entityProperties: any;
  comparisonOperators: Object[];
  model: QueryForm;
  condition: string;
  operatorValue: string;
  propertyDataType: string;
  propertyValue: string;
  tableName: string;
  testString: string;
  uiWrapperSub: Subscription;
  dataQuerySub: Subscription;

  constructor(private dataQueryService: DataQueryService, private uiWrapperService: UiWrapperService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.model = new QueryForm('', 'WHERE', '', '', '');

    this.uiWrapperSub = this.uiWrapperService.activeTable$.subscribe(
      x => {
        this.model.dbTable = x;
        this.clearForm();
        this.cd.markForCheck();
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
    );

    this.dataQuerySub = this.dataQueryService.entity$.subscribe(
      data => {
        this.entityProperties = data.Properties;
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.uiWrapperSub.unsubscribe();
    this.dataQuerySub.unsubscribe();
  }

  clearForm() {
    this.propertyValue = '';
    this.comparisonOperators = [];
    this.operatorValue = '';
    this.propertyDataType = '';
    this.condition = '';
    this.testString = '';
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
