import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, lastValueFrom, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl: string = 'http://localhost:3000/films';
  private movieBeingEditedSubject = new BehaviorSubject<Ifilm | null>(null);
  public movieBeingEdited$ = this.movieBeingEditedSubject.asObservable();
  movieUpdates$ = new Subject<void>();

  constructor(private http: HttpClient) { }
  getAllsMovies(): Promise<Ifilm[]> {

    const getAllMovies = `${this.apiUrl}films`;

    return lastValueFrom(this.http.get<Ifilm[]>(getAllMovies));

  }

  startEditingMovie(movie: Ifilm) {
    this.movieBeingEditedSubject.next(movie);
  }

  stopEditingMovie() {
    this.movieBeingEditedSubject.next(null);
  }

  getMovies(): Observable<Ifilm[]> {
    return this.http.get<Ifilm[]>(this.apiUrl).pipe(
      catchError(this.handleError<Ifilm[]>('getMovies', []))
    );
  }

  getMovieById(id: number): Observable<Ifilm> {
    return this.http.get<Ifilm>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Ifilm>('getMovieById'))
    );
  }

  createMovie(movie: Ifilm): Observable<Ifilm> {
    return this.http.post<Ifilm>(this.apiUrl, movie).pipe(
      tap(() => this.movieUpdates$.next()),
      catchError(this.handleError<Ifilm>('createMovie'))
    );
  }

  updateMovie(id: number, movie: Ifilm): Observable<Ifilm> {
    return this.http.put<Ifilm>(`${this.apiUrl}/${id}`, movie).pipe(
      tap(() => this.movieUpdates$.next()),
      catchError(this.handleError<Ifilm>('updateMovie'))
    );
  }

  deleteMovie(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.movieUpdates$.next()),
      catchError(this.handleError<{}>('deleteMovie'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // TODO: send the error to remote logging infrastructure
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
