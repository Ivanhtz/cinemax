import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, map } from 'rxjs';
import { IComment } from 'src/app/interfaces/icomment.interface';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private urlComments: string = 'http://localhost:3000/'; 

  constructor(private http:HttpClient) { }




getAllComments(): Promise<IComment[]>{
  const url = `${this.urlComments}comments`; 
  return lastValueFrom(this.http.get<IComment[]>(url)); 

}




//Método para obtener los comentarios de la base de datos
getCommentsByArticleId(articleId: number):Promise<IComment[]>{
  const url = `${this.urlComments}comments?articleId=${articleId}`; 
  return lastValueFrom(this.http.get<IComment[]>(url).pipe(
    map(comments => comments.filter(comment => comment.articleId === articleId))
  )
  ); 
}


  
}
