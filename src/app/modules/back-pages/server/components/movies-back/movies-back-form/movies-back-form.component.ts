import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';
import { MoviesService } from 'src/app/services/movies-service/movies.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movies-back-form',
  templateUrl: './movies-back-form.component.html',
  styleUrls: ['./movies-back-form.component.scss'],
})
export class MoviesBackFormComponent implements OnInit, OnDestroy {
  movieForm: FormGroup;
  editingMovie: Ifilm;
  isEditing: boolean = false;
  private unsubscribe$ = new Subject<void>();
  currentYear: number;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private snackBar: MatSnackBar
  ) {
    this.currentYear = new Date().getFullYear();
    this.editingMovie = this.getEmptyMovie();
    this.movieForm = this.initForm();
  }

  ngOnInit(): void {
    this.moviesService.movieBeingEdited$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movie) => {
        if (movie) {
          this.isEditing = true;
          this.editingMovie = movie;
          this.movieForm = this.initForm(movie);
        } else {
          this.isEditing = false;
          this.editingMovie = this.getEmptyMovie();
          this.movieForm = this.initForm();
        }
      });
    this.currentYear = new Date().getFullYear();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getEmptyMovie(): Ifilm {
    return {
      id: 0,
      title: '',
      director: '',
      score: 0,
      year: '',
      genre: '',
      abstract: '',
      img: '',
      text: '',
    };
  }

  private initForm(movie?: Ifilm): FormGroup {
    return this.formBuilder.group({
      title: [
        movie ? movie.title : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      director: [
        movie ? movie.director : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      score: [
        movie ? movie.score : '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      year: [
        movie ? movie.year : null,
        [
          Validators.required,
          Validators.min(1880),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      genre: [
        movie ? movie.genre : '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      abstract: [
        movie ? movie.abstract : '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      img: [
        movie ? movie.img : '',
        [Validators.required, Validators.pattern('https?://.+|/[^/]+')],
      ],
      text: [
        movie ? movie.text : '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
    });
  }

  onSubmit(): void {
    const movieObservable = this.isEditing
      ? this.moviesService.updateMovie(
          this.editingMovie.id,
          this.movieForm.value
        )
      : this.moviesService.createMovie(this.movieForm.value);

    const wasEditing = this.isEditing;

    movieObservable.subscribe(() => {
      this.moviesService.stopEditingMovie();
      this.movieForm.reset();
      this.editingMovie = this.getEmptyMovie();

      // Muestra un mensaje de éxito
      this.snackBar.open(
        `Película ${wasEditing ? 'editada' : 'creada'} exitosamente`,
        'Cerrar',
        { duration: 5000 }
      );
    });
  }

  cancel(): void {
    this.moviesService.stopEditingMovie();
    this.movieForm.reset();
    this.editingMovie = this.getEmptyMovie();
  }
}
