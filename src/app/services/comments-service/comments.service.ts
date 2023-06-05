import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IComment } from 'src/app/interfaces/icomment.interface';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private urlComments: string = 'http://localhost:3000/'; 

  constructor(private http:HttpClient) { }

//Método para obtener los comentarios de la base de datos

getComments(): Observable<IComment[]>{
  const url = `${this.urlComments}comments`; 
  return this.http.get<IComment[]>(url); 
}

getCommentsByArticleId(articleId: number): Observable<IComment[]> {
  return this.getComments().pipe(
    map((comments: IComment[]) => comments.filter(comment => comment.articleId === articleId))
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


  
}
