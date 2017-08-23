
import { Routes, RouterModule } from '@angular/router';

import { URLCategoryComponent } from './url-category.component';

const routes: Routes = [
  {
    path: '',
    component: URLCategoryComponent,
  }
];

export const routing = RouterModule.forChild(routes);