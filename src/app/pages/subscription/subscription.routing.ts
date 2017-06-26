import { Routes, RouterModule } from '@angular/router';

import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionComponent,
  }
];

export const routing = RouterModule.forChild(routes);