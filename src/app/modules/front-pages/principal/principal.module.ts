import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { NavFrontComponent } from './nav-front/nav-front.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    PrincipalComponent,
    NavFrontComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

  ],
  exports: [
    PrincipalComponent
  ]
})
export class PrincipalModule { }
