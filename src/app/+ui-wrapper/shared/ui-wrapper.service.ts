import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class UiWrapperService {
  // Observable string sources
  private activeTableSource = new Subject<string>();

  // Observable string streams
  activeTable$ = this.activeTableSource.asObservable();

  constructor() { }

  // Service function for retrieving data
  setActiveTable(table: string) {
    this.activeTableSource.next(table);
  }

}
