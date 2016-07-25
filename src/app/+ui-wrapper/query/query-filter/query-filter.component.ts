import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';

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
  modelArray: QueryForm[] = [new QueryForm('', '', '', '')];
  propertyDataType: string;
  sqlClause: string[] = ['AND', 'OR'];
  tableName: string;
  testString: string;
  uiWrapperSub: Subscription;

  constructor(private dataQueryService: DataQueryService, private uiWrapperService: UiWrapperService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.uiWrapperSub = this.uiWrapperService.activeTable$.subscribe(
      table => {
        this.tableName = table;
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
    model.isActive = false;
    let invalid: boolean = false;
    //Code below checking the presence of empty strings is most likely unneccesary due to validation which will be added later.
    for (var key in model) {
      if (model[key] === '') {
        invalid = true;
        break;
      }
    }
    if (!invalid) {
      this.modelArray.push(new QueryForm('', '', '', '', true));
    }
  }

  clearForm(model: QueryForm) {
    var index = this.modelArray.indexOf(model);
    if (index === 0) {
      this.modelArray[index] = new QueryForm('WHERE', '', '', '', true);
    } else {
      this.modelArray[index] = new QueryForm('', '', '', '', true);
      this.propertyDataType = '';
      this.testString = '';
    }
  }

  deleteFromQuery(model: QueryForm) {
    this.modelArray = this.modelArray.filter(m => m !== model);
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
        if (this.testString === undefined) {
          this.testString = '{ ' + '"' + this.tableName + '": [';
        }
        this.testString += JSON.stringify(model, null, '\t');
      }
    }
    );
    this.testString += '] }';
  }

}
