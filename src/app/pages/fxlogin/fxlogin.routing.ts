import { Routes, RouterModule }  from '@angular/router';

import { FXLogin } from './fxlogin.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: FXLogin
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
