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
  articleId : number = 0;
  comments: IComment[] = [];
  newComment: IComment = {id: 0, name: '', text: '', articleId: 0}; 

  // Variable para indicar si el formulario de comentarios está visible
showCommentForm = false;



  constructor(private articles: ArticlesService, private commentsService:CommentsService,  private aRoute: ActivatedRoute){ }

  async ngOnInit(): Promise <void> {
    this.aRoute.params.subscribe(async (params: any) =>{
      let idArticle = parseInt(params.id);
      let response = this.articles.getArticleById(idArticle); 
      this.article = await response;
    })
  }

  showForm(): void {
    this.showCommentForm = true;
  }

  getComments(): void {
    this.commentsService.getCommentsByArticleId(this.articleId)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  addComment(): void {
    this.newComment.articleId = this.articleId;
    this.commentsService.addComment(this.newComment)
      .subscribe(comment => {
        this.comments.push(comment);
        this.newComment = { id: 0, name: '', text: '', articleId: 0 };
      });
  }











//   // Método para agregar un comentario a un artículo
// async addComment(comment: string): Promise<void> {
//   const articleId = this.article.id;
//   await this.articles.addCommentToArticle(articleId, comment);
//   // Actualizar el artículo para mostrar el nuevo comentario
//   this.article = await this.articles.getArticleById(articleId);
//   this.article.comments.push(comment); 
// }

// Método para mostrar el formulario de comentarios


}
