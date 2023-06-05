import { Component } from '@angular/core';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';
import { ArticlesService } from 'src/app/services/articles-service/articles.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent{

  arrArticles: Iarticle[]=[] ; 

  //Inyección del Servicio de los articulos
  constructor(private articlesService: ArticlesService ){}

  async ngOnInit(): Promise<void>{
   let response = await this.articlesService.getArticles(); 
   
   this.arrArticles = response; 
  }


}
