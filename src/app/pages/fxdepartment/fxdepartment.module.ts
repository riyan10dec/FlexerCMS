import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FXDepartmentComponent } from './fxdepartment.component';
import { routing } from './fxdepartment.routing';
import { FXDepartmentService } from './fxdepartment.service';
import { ApiService } from '../../shared/apiService';
import { JwtService } from '../../shared/jwt.service';
import { ConnectionAPI } from '../../../environments/connectionAPI';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    FXDepartmentComponent,
  ],
  providers: [
    FXDepartmentService,
    ApiService,
    JwtService,
    ConnectionAPI,
  ],
})
export class FXDepartmentModule { }
