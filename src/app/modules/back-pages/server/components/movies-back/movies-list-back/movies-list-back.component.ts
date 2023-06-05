// movies-list-back.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';

import { MoviesService } from 'src/app/services/movies-service/movies.service';



@Component({
  selector: 'app-movies-list-back',
  templateUrl: './movies-list-back.component.html',
  styleUrls: ['./movies-list-back.component.scss'],
})
export class MoviesListBackComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'edit', 'delete'];
  
  @Input() dataSource: MatTableDataSource<Ifilm> = new MatTableDataSource<Ifilm>();
  @Output() editFilmEvent = new EventEmitter<number>();

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) {}

  deleteFilm(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta película?')) {
      this.moviesService.deleteMovie(id).subscribe(() => {
        alert('Película eliminada exitosamente');
        // Más acciones aquí
      });
    }
  }

  editFilm(id: number): void {
    if (id) {
      console.log(`Editing film with ID: ${id}`);
      this.moviesService.getMovieById(id).then(film => {
        this.moviesService.startEditingMovie(film);
      });
    }
}

  ngOnInit(): void {
    console.log('DataSource:', this.dataSource); // Log to check dataSource
  }
}