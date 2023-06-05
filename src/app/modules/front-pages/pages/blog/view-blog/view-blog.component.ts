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

  // Variable para indicar si el formulario de comentarios está visible
showCommentForm = false;



  constructor(private articles: ArticlesService, private aRoute: ActivatedRoute){ }

  async ngOnInit(): Promise <void> {
    this.aRoute.params.subscribe(async (params: any) =>{
      let idArticle = parseInt(params.id);
      let response = this.articles.getArticleById(idArticle); 
      this.article = await response;
    })
  }

  // Método para agregar un comentario a un artículo
async addComment(comment: string): Promise<void> {
  const articleId = this.article.id;
  await this.articles.addCommentToArticle(articleId, comment);
  // Actualizar el artículo para mostrar el nuevo comentario
  this.article = await this.articles.getArticleById(articleId);
  this.article.comments.push(comment); 
}

// Método para mostrar el formulario de comentarios
showForm(): void {
  this.showCommentForm = true;
}

}
