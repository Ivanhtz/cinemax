import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Iresponse } from 'src/app/interfaces/iresponse.interface';

import { Iuser } from 'src/app/interfaces/iuser.interface';

@Injectable({
  providedIn: 'root',
})
/**
 * UsersService proporciona un conjunto de métodos para manejar las operaciones relacionadas con los usuarios.
 * Esto incluye la obtención, creación, eliminación y actualización de usuarios.
 * También proporciona un BehaviorSubject para el usuario que se está editando actualmente.
 * También proporciona un Subject para las actualizaciones de los usuarios. Emite cuando se ha creado, actualizado o eliminado un usuario.
 */
export class UsersService {
  public apiUrl = 'http://localhost:3000';
  // BehaviorSubject para el usuario que se está editando actualmente.
  private userBeingEditedSubject = new BehaviorSubject<Iuser | null>(null);
  public userBeingEdited$ = this.userBeingEditedSubject.asObservable();
  // Un observable para emitir eventos cuando se actualizan los datos del usuario.
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

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`).pipe(
      tap(() => {
        this.userUpdates$.next();
        // Nos aseguramos de que no estamos editando el usuario que se acaba de eliminar
        this.stopEditingUser();
      }),
      catchError(this.handleError<void>('deleteUser'))
    );
  }

  createUser(userData: any): Observable<Iuser> {
    userData.createdAt = new Date();
    return this.http.post<Iuser>(`${this.apiUrl}/users`, userData).pipe(
      tap(() => this.userUpdates$.next()),
      catchError(this.handleError<Iuser>('createUser'))
    );
  }

  updateUser(id: number, userData: Iuser): Observable<Iuser> {
    return this.getUsers().pipe(
      switchMap((users) => {
        const emailExists = users.some(
          (user) => user.email === userData.email && user.id !== id
        );
        if (emailExists) {
          return throwError(
            () => new Error('Correo electrónico ya existente.')
          );
        } else {
          return this.http
            .patch<Iuser>(`${this.apiUrl}/users/${id}`, userData)
            .pipe(
              tap(() => this.userUpdates$.next()),
              catchError(this.handleError<Iuser>('updateUser'))
            );
        }
      }),
      catchError(this.handleError<Iuser>('updateUser'))
    );
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => error);
    };
  }
}
