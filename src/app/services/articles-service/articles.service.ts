import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private urlService: string = 'http://localhost:3000/';

  constructor(private http:HttpClient) { }

  //Método GET para obtener los artículos desde el db.json
  getArticles():Promise<Iarticle[]>{

    const url = `${this.urlService}articles`; 
    return lastValueFrom(this.http.get<Iarticle[]>(url)); 
  }
}
