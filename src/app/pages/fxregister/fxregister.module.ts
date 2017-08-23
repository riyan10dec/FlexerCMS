import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { FXRegisterComponent } from './fxregister.component';
import { routing } from './fxregister.routing';
import { FXRegisterService } from './fxregister.service';
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
  ],
  declarations: [
    FXRegisterComponent,
  ],
  providers: [
    FXRegisterService,
    ApiService,
    JwtService,
    ConnectionAPI,
  ],
})
export class FXRegisterModule { }
