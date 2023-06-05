import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, of, throwError, defer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Iresponse } from 'src/app/interfaces/iresponse.interface';

import { Iuser } from 'src/app/interfaces/iuser.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3000';
  private userBeingEditedSubject = new BehaviorSubject<Iuser | null>(null);
  public userBeingEdited$ = this.userBeingEditedSubject.asObservable();
  userUpdates$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  startEditingUser(user: Iuser) {
    this.userBeingEditedSubject.next(user);
  }

  stopEditingUser() {
    this.userBeingEditedSubject.next(null);
  }

  register(userData: Iuser): Observable<Iuser> {
    return this.http
      .post<Iuser>(`${this.apiUrl}/register`, userData)
      .pipe(catchError(this.handleError<Iuser>('register')));
  }

  login(userData: Iuser): Observable<Iresponse> {
    return this.http
      .post<Iresponse>(`${this.apiUrl}/login`, userData)
      .pipe(catchError(this.handleError<Iresponse>('login')));
  }

  getUsers(): Observable<Iuser[]> {
    return this.http
      .get<Iuser[]>(`${this.apiUrl}/users`)
      .pipe(catchError(this.handleError<Iuser[]>('getUsers')));
  }

  getUser(id: number): Observable<Iuser> {
    return this.http
      .get<Iuser>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError<Iuser>('getUser')));
  }

  deleteUser(id: number): Observable<Iuser> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`).pipe(
      tap(() => this.userUpdates$.next()),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  createUser(userData: any): Observable<Iuser> {
    userData.createdAt = new Date(); // Agregue esta línea
    return this.http.post<Iuser>(`${this.apiUrl}/users`, userData).pipe(
      tap(() => this.userUpdates$.next()),
      catchError(this.handleError<Iuser>('createUser'))
    );
  }

  updateUser(id: number, userData: Iuser): Observable<Iuser> {
    return this.http.put<Iuser>(`${this.apiUrl}/users/${id}`, userData).pipe(
      tap(() => this.userUpdates$.next()),
      catchError(this.handleError<Iuser>('updateUser'))
    );
  }
  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
  
      // Handle the error here (e.g. show a message to the user)
  
      // Re-throw the error
      return throwError(() => error);
    };
  }
}
