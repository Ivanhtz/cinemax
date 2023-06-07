import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsListComponent } from './films-list/films-list.component';
import { ViewFilmComponent } from './view-film/view-film.component';

const routes: Routes = [
  { path: '', component: FilmsListComponent },
  { path: 'film/:id', component: ViewFilmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
