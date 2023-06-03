import { Component } from '@angular/core';

export interface Movie {
  title: string;
  director: string;
  releaseYear: number;
}

const ELEMENT_DATA: Movie[] = [
  {title: 'Toy Story', director: 'John Lasseter', releaseYear: 1995},
  // more movies...
];

@Component({
  selector: 'app-movies-back',
  templateUrl: './movies-back.component.html',
  styleUrls: ['./movies-back.component.scss']
})
export class MoviesBackComponent {
  displayedColumns: string[] = ['title', 'director', 'releaseYear'];
  dataSource = ELEMENT_DATA;
}
