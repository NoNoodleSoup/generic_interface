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

  entityProperties: any;
  comparisonOperators: Object[];
  model: QueryForm = new QueryForm('', 'WHERE', '', '', '');;
  propertyDataType: string;
  testString: string;
  uiWrapperSub: Subscription;
  dataQuerySub: Subscription;

  constructor(private dataQueryService: DataQueryService, private uiWrapperService: UiWrapperService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.uiWrapperSub = this.uiWrapperService.activeTable$.subscribe(
      table => {
        this.clearForm(table);
        this.cd.markForCheck();
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

  clearForm(table: string) {
    this.model = new QueryForm(table, 'WHERE', '', '', '');
    this.propertyDataType = '';
    this.comparisonOperators = [];
    this.testString = '';
  }

  openDialog() {
    if (this.propertyDataType === 'DateTime' || this.model.comparisonOperator) {
      var dialog: any = document.getElementById('dialog');
      if (dialog) {
        dialog.open();
      }
    }
  }

  submitQuery() {
    this.testString = JSON.stringify(this.model, null, '\t');
  }

}
