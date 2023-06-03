import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { NavBackComponent } from './components/nav-back/nav-back.component';
import { PeliculasBackComponent } from './components/peliculas-back/peliculas-back.component';
import { UsuariosBackComponent } from './components/usuarios-back/usuarios-back.component';
import { ArticulosBackComponent } from './components/articulos-back/articulos-back.component';
import { BackendComponent } from './backend/backend.component';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    NavBackComponent,
    PeliculasBackComponent,
    UsuariosBackComponent,
    ArticulosBackComponent,
    BackendComponent
  ],
  imports: [
    CommonModule,
    ServerRoutingModule,
    MaterialModule
  ]
})
export class ServerModule { }
