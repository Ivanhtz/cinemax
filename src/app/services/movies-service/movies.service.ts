import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private urlMovies: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }


  getAllsMovies(): Promise<Ifilm[]> {

    const getAllMovies = `${this.urlMovies}films`;

    return lastValueFrom(this.http.get<Ifilm[]>(getAllMovies));

  }

  getMovieById(id: any): Promise<Ifilm> {
    const urlId = `${this.urlMovies}films/${id}`;

    return lastValueFrom(this.http.get<Ifilm>(urlId));
  }
}
