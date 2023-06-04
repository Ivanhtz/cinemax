import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDto } from './user-dto/user.dto';
import { ResponseDto } from './response-dto/response.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  private userBeingEditedSubject = new BehaviorSubject<UserDto | null>(null);
  public userBeingEdited$ = this.userBeingEditedSubject.asObservable();
  userUpdates$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  startEditingUser(user: UserDto) {
    this.userBeingEditedSubject.next(user);
  }

  stopEditingUser() {
    this.userBeingEditedSubject.next(null);
  }

  register(userData: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError<UserDto>('register'))
    );
  }

  login(userData: UserDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${this.apiUrl}/login`, userData).pipe(
      catchError(this.handleError<ResponseDto>('login'))
    );
  }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/users`).pipe(
      catchError(this.handleError<UserDto[]>('getUsers', []))
    );
  }

  getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(this.handleError<UserDto>('getUser'))
    );
  }

  deleteUser(id: number): Observable<UserDto> {
    return this.http
      .delete<any>(`${this.apiUrl}/users/${id}`)
      .pipe(
        tap(() => this.userUpdates$.next()),
        catchError(this.handleError<any>('deleteUser'))
      );
  }

  createUser(userData: any): Observable<UserDto> {
    userData.createdAt = new Date(); // Agregue esta línea
    return this.http
      .post<UserDto>(`${this.apiUrl}/users`, userData)
      .pipe(
        tap(() => this.userUpdates$.next()),
        catchError(this.handleError<UserDto>('createUser'))
      );
  }

  updateUser(id: number, userData: UserDto): Observable<UserDto> {
    return this.http
      .put<UserDto>(`${this.apiUrl}/users/${id}`, userData)
      .pipe(
        tap(() => this.userUpdates$.next()),
        catchError(this.handleError<UserDto>('updateUser'))
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