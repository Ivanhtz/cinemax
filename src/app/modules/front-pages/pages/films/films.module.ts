import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmComponent } from './film/film.component';
import { ViewFilmComponent } from './view-film/view-film.component';
import { MaterialModule } from 'src/app/modules/material/material.module';


@NgModule({
  declarations: [
    FilmsListComponent,
    FilmComponent,
    ViewFilmComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MaterialModule
  ],
  exports: [
    FilmsListComponent
  ]
})
export class FilmsModule { }
