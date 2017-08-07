import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EmployeeService } from './employee.service';
import { ApiService } from '../../shared/apiService';
import { JwtService } from '../../shared/jwt.service';
import { TreeModule } from 'angular2-tree-component';

import { EmployeeComponent } from './employee.component';
import { routing } from './employee.routing';

@NgModule({
  
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    Ng2SmartTableModule,
    routing,
    TreeModule,
  ],
  declarations: [
    EmployeeComponent,
  ],
  providers: [
    EmployeeService,
    ApiService,
    JwtService,
  ],
})
export class EmployeeModule {

}
