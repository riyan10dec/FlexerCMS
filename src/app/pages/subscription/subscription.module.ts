import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';


import { SubscriptionComponent } from './subscription.component';
import { routing } from './subscription.routing';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    routing,
  ],
  declarations: [
    SubscriptionComponent,
  ]
})
export class SubscriptionModule {}