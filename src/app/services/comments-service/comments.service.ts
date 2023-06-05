import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComment } from 'src/app/interfaces/icomment.interface';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private urlComments: string = 'http://localhost:3000/'; 

  constructor(private http:HttpClient) { }

  //Método para obtener los comentarios de la base de datos
  getComments(): Promise<IComment[]>{
    const url = `${this.urlComments}comments`;
    return lastValueFrom(this.http.get<IComment[]>(url)); 
  }
}
