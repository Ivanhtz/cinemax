import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';
import { MoviesService } from 'src/app/services/movies-service/movies.service';


@Component({
  selector: 'app-movies-back',
  templateUrl: './movies-back.component.html',
  styleUrls: ['./movies-back.component.scss'],
})
export class MoviesBackComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  movies: MatTableDataSource<Ifilm> = new MatTableDataSource<Ifilm>();

  constructor(private moviesService: MoviesService) {}

  ngAfterViewInit(): void {
    // Primero, obtener las películas iniciales
    this.getMoviesAndSetData();

    // Luego, cada vez que movieUpdates$ emite, obtener las películas de nuevo
    this.moviesService.movieUpdates$
      .pipe(switchMap(() => this.moviesService.getMovies()))
      .subscribe((movies) => {
        this.movies.data = movies;
        if (this.paginator) {
          this.movies.paginator = this.paginator;
        }
      });
  }

  private getMoviesAndSetData(): void {
    this.moviesService.getMovies().subscribe((movies) => {
      this.movies.data = movies;
      if (this.paginator) {
        this.movies.paginator = this.paginator;
      }
    });
  }
}