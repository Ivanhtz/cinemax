import { Component } from '@angular/core';

export interface Article {
  titulo: string;
  autor: string;
  fechaPublicacion: string;
}

const ELEMENT_DATA: Article[] = [
  {titulo: 'Articulo 1', autor: 'Autor 1', fechaPublicacion: '2023-06-01'},
  {titulo: 'Articulo 2', autor: 'Autor 2', fechaPublicacion: '2023-06-02'},
  // agregar más datos de articulos aquí...
];

@Component({
  selector: 'app-articles-back',
  templateUrl: './articles-back.component.html',
  styleUrls: ['./articles-back.component.scss']
})
export class ArticlesBackComponent {
  displayedColumns: string[] = ['titulo', 'autor', 'fechaPublicacion'];
  dataSource = ELEMENT_DATA;
}
