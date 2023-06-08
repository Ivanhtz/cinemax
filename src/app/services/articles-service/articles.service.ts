import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  lastValueFrom,
  tap,
  throwError,
} from 'rxjs';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';

@Injectable({
  providedIn: 'root',
})
/**
 * ArticlesService proporciona un conjunto de métodos para manejar las operaciones relacionadas con los artículos.
 * Esto incluye la obtención, creación, eliminación y actualización de artículos.
 * También proporciona un BehaviorSubject para el artículo que se está editando actualmente.
 * También proporciona un Subject para las actualizaciones de los artículos. Emite cuando se ha creado, actualizado o eliminado un artículo.
 */
export class ArticlesService {
  private urlArticle: string = 'http://localhost:3000/';
  // BehaviorSubject para el artículo que se está editando actualmente.
  private articleBeingEditedSubject = new BehaviorSubject<Iarticle | null>(
    null
  );
  public articleBeingEdited$ = this.articleBeingEditedSubject.asObservable();
  // Observable que emite eventos cuando hay actualizaciones de los artículos.
  articleUpdates$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getArticles(): Promise<Iarticle[]> {
    const url = `${this.urlArticle}articles`;
    return lastValueFrom(this.http.get<Iarticle[]>(url));
  }

  getArticleById(id: any): Promise<Iarticle> {
    const urlId = `${this.urlArticle}articles/${id}`;

    return lastValueFrom(this.http.get<Iarticle>(urlId));
  }

  addCommentToArticle(articleId: string, comment: string): Promise<any> {
    const url = `${this.urlArticle}articles/${articleId}/comments`;
    const body = { comment };

    return lastValueFrom(this.http.post(url, body));
  }

  createArticle(article: Iarticle): Observable<Iarticle> {
    return this.http.post<Iarticle>(`${this.urlArticle}articles`, article).pipe(
      tap(() => this.articleUpdates$.next()),
      catchError(this.handleError<Iarticle>('createArticle'))
    );
  }

  startEditingArticle(article: Iarticle) {
    this.articleBeingEditedSubject.next(article);
  }

  stopEditingArticle() {
    this.articleBeingEditedSubject.next(null);
  }

  updateArticle(id: number, article: Iarticle): Observable<Iarticle> {
    return this.http
      .put<Iarticle>(`${this.urlArticle}articles/${id}`, article)
      .pipe(
        tap(() => {
          this.articleUpdates$.next();
          // Nos aseguramos de que no estamos editando el artículo que acabamos de actualizar
          this.stopEditingArticle();
        }),
        catchError(this.handleError<Iarticle>('updateArticle'))
      );
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlArticle}articles/${id}`).pipe(
      tap(() => {
        this.articleUpdates$.next();
        // Nos aseguramos de que no estamos editando el artículo que acabamos de eliminar
        this.stopEditingArticle();
      }),
      catchError(this.handleError<void>('deleteArticle'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
