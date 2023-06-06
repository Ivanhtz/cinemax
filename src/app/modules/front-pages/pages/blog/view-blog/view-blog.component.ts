import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/interfaces/icomment.interface';
import { ArticlesService } from 'src/app/services/articles-service/articles.service';
import { CommentsService } from 'src/app/services/comments-service/comments.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent {

  article !: any; 
  comments : IComment[]= [];
  newComments:IComment[]=[]; 
  textComment: string = '';
  nameComment: string = ''; 
  articleId: number = 0;
  

  // Variable para indicar si el formulario de comentarios está visible
showCommentForm = false;



  constructor(private articles: ArticlesService, private commentsService:CommentsService, private aRoute: ActivatedRoute){ }

  async ngOnInit(): Promise <void> {
    this.aRoute.params.subscribe(async (params: any) =>{
      let idArticle = parseInt(params.id);
      let response = this.articles.getArticleById(idArticle); 
      this.article = await response;
    })  
      
  }

    // Método para mostrar el formulario de comentarios
    showForm(): void {
      this.showCommentForm = true;
    }
    

   
    
}



