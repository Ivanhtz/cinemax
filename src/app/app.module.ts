import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { C404Component } from './components/c404/c404.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { FormComponent } from './components/home/form/form.component';
import { MaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';
import { PrincipalModule } from './modules/front-pages/principal/principal.module';


@NgModule({
  declarations: [
    AppComponent,
    C404Component,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    FormComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    PrincipalModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
