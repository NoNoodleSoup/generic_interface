import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { PolymerElement } from '@vaadin/angular2-polymer';
import { Subscription }   from 'rxjs/Subscription';

import { DataQueryService } from '../../../services';
import { QueryForm, Enum } from '../../../models';
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

  comparisonOperators: Object[] = [];
  dataQuerySub: Subscription;
  entityProperties: any;
  Enum: string;
  enumMetaData: Enum;
  errorMessage: string;
  formObj: Object = {};
  modelArray: QueryForm[] = [new QueryForm('', '', '', '', '')];
  sqlClause: string[] = ['AND', 'OR'];
  submitted: boolean = false;
  tableName: string;
  testString: string;
  uiWrapperSub: Subscription;

  constructor(private dataQueryService: DataQueryService, private uiWrapperService: UiWrapperService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.uiWrapperSub = this.uiWrapperService.activeTable$.subscribe(
      table => {
        this.formObj = { [table]: [] }
        this.modelArray = [new QueryForm('WHERE', '', '', '', '', true)];
        this.tableName = table;
        this.comparisonOperators = [];
        this.testString = undefined;
        this.cd.markForCheck();
      },
      error => this.errorMessage = <string>error
    );

    this.dataQuerySub = this.dataQueryService.entity$.subscribe(
      data => this.entityProperties = data.Properties,
      error => this.errorMessage = <string>error
    );

    this.dataQueryService.enum$.subscribe(
      data => this.enumMetaData = data,
      error => this.errorMessage = <string>error
    )
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.uiWrapperSub.unsubscribe();
    this.dataQuerySub.unsubscribe();
  }

  addToQuery(model) {
    let invalid: boolean = false;
    //Code below checking the presence of empty strings is most likely unneccesary due to validation which will be added later.
    if (model.condition) {
      this.modelArray.push(new QueryForm('', '', '', '', '', true));
      model.isActive = false;
    }
  }

  clearForm(model: QueryForm) {
    let index = this.modelArray.indexOf(model);
    console.log(index);
    if (index > 0) {
      this.deleteFromQuery(model);
    }
    else{
    model.dataType = undefined;
      this.modelArray[index] = new QueryForm('WHERE', '', '', '', '', true);
    }
  }

  private deleteFromQuery(model: QueryForm) {
    this.modelArray = this.modelArray.filter(m => m !== model);
    this.modelArray[this.modelArray.length - 1].isActive = true;
  }

  getOperators(model: QueryForm) {
    let nullable: boolean = false;
    if (model.dataType[model.dataType.length - 1] === '?') {
      nullable = true;
      model.dataType = model.dataType.slice(0, -1);
    }
    if (model.comparisonOperator) {
      model.comparisonOperator = '';
      model.condition = '';
    }
    switch (model.dataType) {
      case 'Boolean': this.comparisonOperators = [
        { operator: 'Is', value: '' },
        { operator: 'Is Not', value: '' }
      ];
        break;
      case 'DateTime':
      case 'Int32': this.comparisonOperators = [
        { operator: 'Is', value: '' },
        { operator: 'Is Not', value: '' },
        { operator: 'Less Than', value: '' },
        { operator: 'Less Than or Equal', value: '' },
        { operator: 'Greater Than', value: '' },
        { operator: 'Greater Than or Equal', value: '' },
      ];
        break;
      case 'Enum': this.getEnumMetaData(this.Enum);
        this.comparisonOperators = [
          { operator: 'Is', value: '' },
          { operator: 'Is Not', value: '' }
        ];
        break;
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

  getEnumMetaData(dataType: string) {
    this.dataQueryService.getEnumMetaData(dataType);
  }

  openDialog(model) {
    if (model.dataType === 'DateTime' || model.comparisonOperator) {
      var dialog: any = document.getElementById('dialog');
      if (dialog) {
        dialog.open();
      }
    }
  }

  submitQuery() {
    if (this.submitted) {
      this.modelArray[this.modelArray.length - 1].isActive = true;
      this.formObj = { [this.tableName]: [] }
      this.testString = undefined;
      this.submitted = false;
    }
    else if (this.modelArray[this.modelArray.length - 1].condition) {
      this.modelArray.forEach(model => {
        let temp = Object.assign({}, model);
        delete temp.isActive;
        this.formObj[this.tableName].push(temp);
      });
      this.testString = JSON.stringify(this.formObj, null, '\t');
      this.modelArray[this.modelArray.length - 1].isActive = false;
      this.submitted = true;
    }
  }

}
