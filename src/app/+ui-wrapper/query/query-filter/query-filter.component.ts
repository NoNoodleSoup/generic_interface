import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm }    from '@angular/forms';

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
    PolymerElement('paper-radio-button'),
    PolymerElement('paper-radio-group'),
    PolymerElement('paper-time-picker'),
    PolymerElement('vaadin-date-picker'),
    PolymerElement('vaadin-combo-box')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryFilterComponent implements OnInit {

  //Do not leave comparisonOperators property like this!!
  comparisonOperators: Object[] = [
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
  dataQuerySub: Subscription;
  entityProperties: any;
  formObj: Object = {};
  modelArray: QueryForm[] = [new QueryForm('', '', '', '')];
  propertyDataType: string;
  sqlClause: string[] = ['AND', 'OR'];
  submitted = false;
  tableName: string;
  testString: string;
  uiWrapperSub: Subscription;

  constructor(private dataQueryService: DataQueryService, private uiWrapperService: UiWrapperService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.uiWrapperSub = this.uiWrapperService.activeTable$.subscribe(
      table => {
        this.formObj = { [table]: [] }
        this.tableName = table;
        this.testString = undefined;
        this.modelArray = [new QueryForm('WHERE', '', '', '', true)];
        this.cd.markForCheck();
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

  addToQuery(model) {
    let invalid: boolean = false;
    //Code below checking the presence of empty strings is most likely unneccesary due to validation which will be added later.
    for (var key in model) {
      if (model[key] === '') {
        invalid = true;
        break;
      }
    }
    if (!invalid) {
      model.isActive = false;
      this.modelArray.push(new QueryForm('', '', '', '', true));
    }
  }

  clearForm(model: QueryForm) {
    let index = this.modelArray.indexOf(model);
    this.propertyDataType = '';
    this.testString = undefined;

    if (index === 0) {
      this.modelArray[index] = new QueryForm('WHERE', '', '', '', true);
    } else {
      this.modelArray[index] = new QueryForm('', '', '', '', true);
    }
  }

  deleteFromQuery(model: QueryForm) {
    this.modelArray = this.modelArray.filter(m => m !== model);
  }

  getOperators() {
    let nullable: boolean = false;
    if (this.propertyDataType[this.propertyDataType.length - 1] === '?') {
      nullable = true;
      this.propertyDataType = this.propertyDataType.slice(0, -1);
    }
    switch (this.propertyDataType) {
      case 'Boolean': this.comparisonOperators = [
        { operator: 'Is', value: '' },
        { operator: 'Is Not', value: '' }
      ];
        break;
      case 'Int32':
      case 'DateTime': this.comparisonOperators = [
        { operator: 'Is', value: '' },
        { operator: 'Is Not', value: '' },
        { operator: 'Less Than', value: '' },
        { operator: 'Less Than or Equal', value: '' },
        { operator: 'Greater Than', value: '' },
        { operator: 'Greater Than or Equal', value: '' },
      ];
        break;
      case 'Enum': this.comparisonOperators = [
        { operator: 'Is', value: '' },
        { operator: 'Is Not', value: '' },
      ]
      case 'String': this.comparisonOperators = [
        { operator: 'Is', value: '' },
        { operator: 'Is Not', value: '' },
        { operator: 'Like', value: '' }
      ];
        break;
      default: this.comparisonOperators = [
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
        break;
    }
    if (nullable) {
      this.comparisonOperators.push(
        { operator: 'Is Null', value: '' },
        { operator: 'Is Not Null', value: '' }
      );
    }
  }

  openDialog(model) {
    if (this.propertyDataType === 'DateTime' || model.comparisonOperator) {
      var dialog: any = document.getElementById('dialog');
      if (dialog) {
        dialog.open();
      }
    }
  }

  submitQuery() {
    this.submitted = true;
    let invalid: boolean = false;
    this.modelArray.forEach(model => {
      //Code below checking the presence of empty strings is most likely unneccesary due to validation which will be added later.
      for (var key in model) {
        if (model[key] === '') {
          invalid = true;
          break;
        }
      }
      if (!invalid) {
        this.formObj[this.tableName].push(model);
      }
    });
    if (!invalid) {
      this.testString = JSON.stringify(this.formObj, null, '\t');
    }
  }

}
