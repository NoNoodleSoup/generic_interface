/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { UiWrapperService } from './ui-wrapper.service';

describe('UiWrapper Service', () => {
  beforeEachProviders(() => [UiWrapperService]);

  it('should ...',
      inject([UiWrapperService], (service: UiWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
