import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  lastValueFrom,
  of,
  throwError,
} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private urlMovie: string = 'http://localhost:3000/';
  private movieBeingEditedSubject = new BehaviorSubject<Ifilm | null>(null);
  public movieBeingEdited$ = this.movieBeingEditedSubject.asObservable();
  movieUpdates$ = new Subject<void>();

  constructor(private http: HttpClient) {}
  getAllsMovies(): Promise<Ifilm[]> {
    const getAllMovies = `${this.urlMovie}films`;

    return lastValueFrom(this.http.get<Ifilm[]>(getAllMovies));
  }

  startEditingMovie(movie: Ifilm) {
    this.movieBeingEditedSubject.next(movie);
  }

  stopEditingMovie() {
    this.movieBeingEditedSubject.next(null);
  }

  getMovies(): Observable<Ifilm[]> {
    return this.http
      .get<Ifilm[]>(`${this.urlMovie}films`)
      .pipe(catchError(this.handleError<Ifilm[]>('getMovies', [])));
  }

  getMovieById(id: number): Promise<Ifilm> {
    const urlId = `${this.urlMovie}films/${id}`;
    return lastValueFrom(this.http.get<Ifilm>(urlId));
  }

  createMovie(movie: Ifilm): Observable<Ifilm> {
    return this.http.post<Ifilm>(`${this.urlMovie}films`, movie).pipe(
      tap(() => this.movieUpdates$.next()),
      catchError(this.handleError<Ifilm>('createMovie'))
    );
  }

  updateMovie(id: number, movie: Ifilm): Observable<Ifilm> {
    return this.http.put<Ifilm>(`${this.urlMovie}films/${id}`, movie).pipe(
      tap(() => this.movieUpdates$.next()),
      catchError(this.handleError<Ifilm>('updateMovie'))
    );
  }

  deleteMovie(id: number): Observable<{}> {
    return this.http.delete(`${this.urlMovie}films/${id}`).pipe(
      tap(() => this.movieUpdates$.next()),
      catchError(this.handleError<{}>('deleteMovie'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Emit the error so it can be handled by the component
      return throwError(error);
    };
  }
}
