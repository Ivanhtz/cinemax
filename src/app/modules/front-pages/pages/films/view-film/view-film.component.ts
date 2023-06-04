import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movies-service/movies.service';

@Component({
  selector: 'app-view-film',
  templateUrl: './view-film.component.html',
  styleUrls: ['./view-film.component.scss']
})
export class ViewFilmComponent {

  movie!: any;


  constructor(private movies: MovieService, private aRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    this.aRoute.params.subscribe(async (params: any) => {
      let idMovie = parseInt(params.id);
      let response = this.movies.getMovieById(idMovie);
      this.movie = await response;
    })

  }

}
