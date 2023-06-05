import { Component } from '@angular/core';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';
import { MoviesService } from 'src/app/services/movies-service/movies.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent {

  filmsArr: Ifilm[] = []
  gendersArr: string[] = []; // Genero array para almacenar los géneros para aplicar un filtro de búsqueda
  directorsArr: string[] = []; // Genero array para almacenar los directores para aplicar un filtro de búsqueda
  numberMovies: number = 0;
  generoo: string = '';


  constructor(private films: MoviesService) { }

  async ngOnInit(): Promise<void> {
    let response = await this.films.getAllsMovies();

    this.filmsArr = response;

    this.numberMovies = this.filmsArr.length;

    // Lleno los arrays desde el principal, filtrando solo tanto por género y por director, instancio un set para que no vengan datos repetidos
    this.gendersArr = [...new Set(this.filmsArr.map(value => value.genre))];

    this.directorsArr = [...new Set(this.filmsArr.map(value => value.director))];

  }


  showFilms() {

    console.log(this.generoo);

    this.filmsArr = this.filmsArr.filter(value => value.genre === this.generoo);
  }

}
