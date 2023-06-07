import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: '', component:UsersListComponent},
  { path: 'users/:id', component: ViewUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRegisterRoutingModule { }
