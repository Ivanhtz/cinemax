import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRegisterRoutingModule } from './users-register-routing.module';
import { UserComponent } from './user/user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ViewUserComponent } from './view-user/view-user.component';


@NgModule({
  declarations: [
    UserComponent,
    UsersListComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    UsersRegisterRoutingModule
  ]
})
export class UsersRegisterModule { }
