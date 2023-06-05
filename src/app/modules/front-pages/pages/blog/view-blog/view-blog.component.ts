import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles-service/articles.service';
import { CommentsService } from 'src/app/services/comments-service/comments.service';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';
import { IComment } from 'src/app/interfaces/icomment.interface';


@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent {

  article !: any; 
  articleId: number = 0; 
  comments: IComment [] = []; 

  // Variable para indicar si el formulario de comentarios está visible
  showCommentForm = false;



  constructor(private articles: ArticlesService, private commentsService:CommentsService,  private aRoute: ActivatedRoute){ }

  async ngOnInit(): Promise <void> {
     let response = await this.commentsService.getCommentsByArticleId(this.articleId); 
     console.log(response);

  }

  // loadComments(){
  //   this.commentsService.getCommentsByArticleId(this.articleId)
  //   .subscribe(comments => this.comments = comments); 
  // }


  // showForm(): void {
  //   this.showCommentForm = true;
  // }





}
