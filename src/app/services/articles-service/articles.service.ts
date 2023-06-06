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
export class ArticlesService {
  private urlArticle: string = 'http://localhost:3000/';
  private articleBeingEditedSubject = new BehaviorSubject<Iarticle | null>(
    null
  );
  public articleBeingEdited$ = this.articleBeingEditedSubject.asObservable();
  articleUpdates$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  //Método GET para obtener los artículos desde el db.json
  getArticles(): Promise<Iarticle[]> {
    const url = `${this.urlArticle}articles`;
    return lastValueFrom(this.http.get<Iarticle[]>(url));
  }

  // Método para mostrar articulos individuales
  getArticleById(id: any): Promise<Iarticle> {
    const urlId = `${this.urlArticle}articles/${id}`;

    return lastValueFrom(this.http.get<Iarticle>(urlId));
  }

  // Método para agregar comentarios a un artículo
  addCommentToArticle(articleId: string, comment: string): Promise<any> {
    const url = `${this.urlArticle}articles/${articleId}/comments`;
    const body = { comment };

    return lastValueFrom(this.http.post(url, body));
  }

  // Método para crear un nuevo artículo
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

  // Método para actualizar un artículo
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

  // Método para eliminar un artículo
  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlArticle}articles/${id}`).pipe(
      tap(() => {
        this.articleUpdates$.next();
        // Noa aseguramos de que no estamos editando el artículo que acabamos de eliminar
        this.stopEditingArticle();
      }),
      catchError(this.handleError<void>('deleteArticle'))
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
