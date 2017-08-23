import { Routes, RouterModule }  from '@angular/router';

import { FXRegisterComponent } from './fxregister.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: FXRegisterComponent
  }
];

export const routing = RouterModule.forChild(routes);
