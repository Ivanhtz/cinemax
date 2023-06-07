import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles-service/articles.service';


@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent {

  article !: any; 


  constructor(private articles: ArticlesService, private aRoute: ActivatedRoute){ }

  async ngOnInit(): Promise <void> {
    this.aRoute.params.subscribe(async (params: any) =>{
      let idArticle = parseInt(params.id);
      let response = this.articles.getArticleById(idArticle); 
      this.article = await response;
      console.log(this.article);
    })         
  }  
}



