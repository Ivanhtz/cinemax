import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { NavBackComponent } from './components/nav-back/nav-back.component';
import { MoviesBackComponent } from './components/movies-back/movies-back.component';
import { UsersBackComponent } from './components/users-back/users-back.component';
import { ArticlesBackComponent } from './components/articles-back/articles-back.component';
import { BackendComponent } from './backend/backend.component';
import { MaterialModule } from '../../material/material.module';
import { UsersBackFormComponent } from './components/users-back/users-back-form/users-back-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesBackFormComponent } from './components/movies-back/movies-back-form/movies-back-form.component';
import { ArticlesBackFormComponent } from './components/articles-back/articles-back-form/articles-back-form.component';
import { UsersListBackComponent } from './components/users-back/users-list-back/users-list-back.component';


@NgModule({
  declarations: [
    NavBackComponent,
    MoviesBackComponent,
    UsersBackComponent,
    ArticlesBackComponent,
    BackendComponent,
    UsersBackFormComponent,
    MoviesBackFormComponent,
    ArticlesBackFormComponent,
    UsersListBackComponent
  ],
  imports: [
    CommonModule,
    ServerRoutingModule,
    MaterialModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  exports: [
    BackendComponent
  ]
})
export class ServerModule { }
