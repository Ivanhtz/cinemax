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


    

    this.filteredComments(); 


  }

  
  // Método para mostrar el formulario de comentarios
  showForm(): void {
    this.showCommentForm = true;
  }
  
  //Método para añadir comentarios nuevos
  async addComment(): Promise<void>{
    let newComment = {
      name: this.nameComment,
      text: this.textComment,
      articleId: this.articleId
    }
    
    if (newComment.name === '' || newComment.text === ''){
      alert ("Campos vacíos");
      return; 
    }else{
      let response = await this.commentsService.postComment(newComment);
      this.filteredComments(); 
      this.nameComment = '';  // Borrar el campo de nombre
      this.textComment = '';  // Borrar el campo de comentario
    }
    
  }

  async filteredComments(){
    this.aRoute.params.subscribe(async(params:any) => {
      this.articleId = parseInt(params.id)
    })
    
    let resp = await this.commentsService.getAllComments(); 
    this.comments = resp; 

    let newResponse = this.comments.filter(value => value.articleId == this.articleId);
    this.newComments = newResponse; 
    console.log(this.newComments); 
  }
    
}



//   // Método para agregar un comentario a un artículo
// async addComment(comment: string): Promise<void> {
//   const articleId = this.article.id;
//   await this.articles.addCommentToArticle(articleId, comment);
//   // Actualizar el artículo para mostrar el nuevo comentario
//   this.article = await this.articles.getArticleById(articleId);
//   this.article.comments.push(comment); 
// }