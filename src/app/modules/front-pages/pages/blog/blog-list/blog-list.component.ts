import { Component, ViewChild } from '@angular/core';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';
import { ArticlesService } from 'src/app/services/articles-service/articles.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent{
  @ViewChild(MatPaginator) paginator ?: MatPaginator;
  pageSize = 6; 
  pageIndex = 0; 
  arrArticles: Iarticle[]=[] ; 
  

  //Inyección del Servicio de los articulos
  constructor(private articlesService: ArticlesService ){}

  async ngOnInit(): Promise<void>{
   let response = await this.articlesService.getArticles(); 
   
   this.arrArticles = response; 
  }

  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }


}