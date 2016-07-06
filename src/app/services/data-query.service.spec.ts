/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DataQueryService } from './data-query.service';

describe('DataQuery Service', () => {
  beforeEachProviders(() => [DataQueryService]);

  it('should ...',
      inject([DataQueryService], (service: DataQueryService) => {
    expect(service).toBeTruthy();
  }));
});
