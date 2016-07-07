import { provideRouter, RouterConfig } from '@angular/router';

import { UiWrapperComponent } from './+ui-wrapper';

export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '+ui-wrapper',
        terminal: true
    },
    {
        path: '+ui-wrapper',
        component: UiWrapperComponent
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];