import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { C404Component } from './components/c404/c404.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';

import { MaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { LoginGuard } from './guards/login.guard';


import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { UserService } from './services/users-service/users.service';

import { FormComponent } from './components/home/form/form.component';
import { Token } from './interceptors/interceptor.interceptor';
import { AuthsService } from './services/auths-service/auths.service';
import { ArticlesService } from './services/articles-service/articles.service';
import { MovieService } from './services/movies-service/movies.service';




@NgModule({
  declarations: [
    AppComponent,
    C404Component,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    FormComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule



  ],
  providers: [
    UserService,
    AuthsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Token,
      multi: true
    },
    LoginGuard,
    MovieService,
    ArticlesService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
