import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';

import { MoviesService } from 'src/app/services/movies-service/movies.service';


@Component({
  selector: 'app-movies-back-form',
  templateUrl: './movies-back-form.component.html',
  styleUrls: ['./movies-back-form.component.scss'],
})
export class MoviesBackFormComponent implements OnInit {
  movieForm: FormGroup;
  editingMovie: Ifilm;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService
  ) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      score: ['', Validators.required],
      year: ['', Validators.required],
      genre: ['', Validators.required],
      abstract: ['', Validators.required],
      img: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.editingMovie = {
      id: 0,
      title: '',
      director: '',
      score: 0,
      year: '',
      genre: '',
      abstract: '',
      img: '',
      text: ''
    };
  }

  ngOnInit(): void {
    this.moviesService.movieBeingEdited$.subscribe((movie) => {
      if (movie) {
        this.isEditing = true;
        this.editingMovie = movie;
        this.movieForm = this.formBuilder.group({
          title: [movie.title, Validators.required],
          director: [movie.director, Validators.required],
          score: [movie.score, Validators.required],
          year: [movie.year, Validators.required],
          genre: [movie.genre, Validators.required],
          abstract: [movie.abstract, Validators.required],
          img: [movie.img, Validators.required],
          text: [movie.text, Validators.required]
        });
      } else {
        this.isEditing = false;
        this.editingMovie = {
          id: 0,
          title: '',
          director: '',
          score: 0,
          year: '',
          genre: '',
          abstract: '',
          img: '',
          text: ''
        };
        this.movieForm = this.formBuilder.group({
          title: ['', Validators.required],
          director: ['', Validators.required],
          score: ['', Validators.required],
          year: ['', Validators.required],
          genre: ['', Validators.required],
          abstract: ['', Validators.required],
          img: ['', Validators.required],
          text: ['', Validators.required]
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.moviesService
        .updateMovie(this.editingMovie.id, this.movieForm.value)
        .subscribe(() => {
          this.moviesService.stopEditingMovie();
        });
    } else {
      this.moviesService.createMovie(this.movieForm.value).subscribe(() => {
        this.moviesService.stopEditingMovie();
      });
    }
  }

  cancel(): void {
    this.moviesService.stopEditingMovie();
  }
}