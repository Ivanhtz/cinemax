import { Component } from '@angular/core';

export interface Pelicula {
  title: string;
  director: string;
  releaseYear: number;
}

const ELEMENT_DATA: Pelicula[] = [
  {title: 'Toy Story', director: 'John Lasseter', releaseYear: 1995},
  // more movies...
];

@Component({
  selector: 'app-peliculas-back',
  templateUrl: './peliculas-back.component.html',
  styleUrls: ['./peliculas-back.component.scss']
})
export class PeliculasBackComponent {
  displayedColumns: string[] = ['title', 'director', 'releaseYear'];
  dataSource = ELEMENT_DATA;
}
