
import { Routes, RouterModule } from '@angular/router';

import { ApplicationCategoryComponent } from './application-category.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationCategoryComponent,
  }
];

export const routing = RouterModule.forChild(routes);