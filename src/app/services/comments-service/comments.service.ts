import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, lastValueFrom, Subject } from 'rxjs';
import { IComment } from 'src/app/interfaces/icomment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private urlComments: string = 'http://localhost:3000/';
  commentAdded = new Subject<void>();

  constructor(private http: HttpClient) { }

  //Método para obtener todos los comentarios
  getAllComments(): Promise<IComment[]> {
    const url = `${this.urlComments}comments`;
    return lastValueFrom(this.http.get<IComment[]>(url));

  }

  //Método para añadir comentarios
  async postComment(comment: IComment): Promise<IComment> {
    const url = `${this.urlComments}comments`;
    const response = await lastValueFrom(this.http.post<IComment>(url, comment));
    this.commentAdded.next();
    return response;
  }

  //Método para obtener los comentarios de la base de datos

  getComments(): Observable<IComment[]> {
    const url = `${this.urlComments}comments`;
    return this.http.get<IComment[]>(url);
  }

  getCommentsByArticleId(articleId: number): Observable<IComment[]> {
    return this.getComments().pipe(
      map((comments: IComment[]) =>
        comments.filter((comment) => comment.articleId === articleId)
      )
    );
  }

  addComment(comment: IComment): Observable<IComment> {
    return this.getComments().pipe(
      map((comments: IComment[]) => {
        comment.id = comments.length + 1;
        comments.push(comment);
        return comment;
      })
    );
  }

  deleteComment(id: number): Observable<void> {
    const url = `${this.urlComments}comments/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError(this.handleError<void>('deleteComment')));
  }

  refreshComments(): Observable<IComment[]> {
    return this.getComments();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
