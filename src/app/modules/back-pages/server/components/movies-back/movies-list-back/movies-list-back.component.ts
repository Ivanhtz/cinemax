// movies-list-back.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogContentComponent } from '../../dialog-content.component';
import { MoviesService } from 'src/app/services/movies-service/movies.service';

@Component({
  selector: 'app-movies-list-back',
  templateUrl: './movies-list-back.component.html',
  styleUrls: ['./movies-list-back.component.scss'],
})
export class MoviesListBackComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'edit', 'delete'];

  @Input() dataSource: MatTableDataSource<Ifilm> =
    new MatTableDataSource<Ifilm>();
  @Output() editFilmEvent = new EventEmitter<number>();

  constructor(
    private moviesService: MoviesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  deleteFilm(id: number): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { message: '¿Está seguro de que desea eliminar esta película?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.moviesService.deleteMovie(id).subscribe(() => {
          this.snackBar.open(
            `Película con ID ${id} eliminada exitosamente`,
            'Cerrar',
            { duration: 5000 }
          );
        });
      }
    });
  }

  editFilm(id: number): void {
    if (id) {
      console.log(`Editing film with ID: ${id}`);
      this.moviesService.getMovieById(id).then((film) => {
        this.moviesService.startEditingMovie(film);
      });
    }
  }
  ngOnInit(): void {
    console.log('DataSource:', this.dataSource); 
  }
}
