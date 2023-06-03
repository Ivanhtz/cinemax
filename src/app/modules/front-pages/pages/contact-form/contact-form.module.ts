import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactFormRoutingModule } from './contact-form-routing.module';
import { FormContactComponent } from './form-contact/form-contact.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormContactComponent
  ],
  imports: [
    CommonModule,
    ContactFormRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  exports: [
    FormContactComponent
  ]
})
export class ContactFormModule { }
