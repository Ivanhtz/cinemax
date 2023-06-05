import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private urlArticle: string = 'http://localhost:3000/';

  constructor(private http:HttpClient) { }

  //Método GET para obtener los artículos desde el db.json
  getArticles():Promise<Iarticle[]>{

    const url = `${this.urlArticle}articles`; 
    return lastValueFrom(this.http.get<Iarticle[]>(url)); 
  }

 // Método para mostrar articulos individuales
  getArticleById(id:any): Promise<Iarticle>{
    const urlId = `${this.urlArticle}articles/${id}`;

    return lastValueFrom(this.http.get<Iarticle>(urlId)); 
  }


  // Método para agregar comentarios a un artículo
addCommentToArticle(articleId: string, comment: string): Promise<any> {
  const url = `${this.urlArticle}articles/${articleId}/comments`;
  const body = { comment };

  return lastValueFrom(this.http.post(url, body));
}
}