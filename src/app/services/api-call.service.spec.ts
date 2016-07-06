/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ApiCallService } from './api-call.service';

describe('ApiCall Service', () => {
  beforeEachProviders(() => [ApiCallService]);

  it('should ...',
      inject([ApiCallService], (service: ApiCallService) => {
    expect(service).toBeTruthy();
  }));
});
