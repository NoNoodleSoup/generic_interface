import { bootstrap } from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { enableProdMode } from '@angular/core';

import { AppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTER_PROVIDERS
]);

