import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRegisterRoutingModule } from './users-register-routing.module';
import { UserComponent } from './user/user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material/material.module';


@NgModule({
  declarations: [
    UserComponent,
    UsersListComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    UsersRegisterRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    UsersListComponent,
    ViewUserComponent
  ]
})
export class UsersRegisterModule { }
