import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2SmartTableModule } from 'ng2-smart-table';


import { ApplicationCategoryComponent } from './application-category.component';
import { routing } from './application-category.routing';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    Ng2SmartTableModule,
    routing,
  ],
  declarations: [
    ApplicationCategoryComponent,
  ]
})
export class ApplicationCategoryModule {

}