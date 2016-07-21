/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { Http } from '@angular/http';

import { QueryComponent } from './query.component';
import { DataQueryService } from '../../services';
import { UiWrapperService } from '../shared';

describe('Component: Query', () => {
  it('should create an instance', () => {
    let component = new QueryComponent( DataQueryService.prototype, UiWrapperService.prototype );
    expect(component).toBeTruthy();
  });
});
