import { Component } from '@angular/core';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';
import { MovieService } from 'src/app/services/movies-service/movies.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent {

  filmsArr: Ifilm[] = []

  constructor(private films: MovieService) { }

  async ngOnInit(): Promise<void> {
    let response = await this.films.getAllsMovies();

    this.filmsArr = response;

  }

}
