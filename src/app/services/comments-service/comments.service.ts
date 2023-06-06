import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { IComment } from 'src/app/interfaces/icomment.interface';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private urlComments: string = 'http://localhost:3000/'; 

  constructor(private http:HttpClient) { }
 

  //Método para obtener todos los comentarios
  getAllComments(): Promise<IComment[]>{
    const url = `${this.urlComments}comments`; 
    return lastValueFrom(this.http.get<IComment[]>(url)); 
    
  }
  
  //Método para añadir comentarios
  postComment(comment:IComment): Promise<IComment>{
    const url = `${this.urlComments}comments`;
    return lastValueFrom(this.http.post<IComment>(url, comment));
  }



}
  
