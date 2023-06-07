import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmComponent } from './film/film.component';
import { ViewFilmComponent } from './view-film/view-film.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { AbstractPipe } from './pipes/abstract.pipe';
import { ColorTextDirective } from './directives/colorText.directive';


@NgModule({
  declarations: [
    FilmsListComponent,
    FilmComponent,
    ViewFilmComponent,
    AbstractPipe,
    ColorTextDirective
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MaterialModule,
    FormsModule

  ],
  exports: [
    FilmsListComponent,
    ViewFilmComponent
  ]
})
export class FilmsModule { }
