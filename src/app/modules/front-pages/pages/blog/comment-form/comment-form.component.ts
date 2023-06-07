import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/interfaces/icomment.interface';
import { CommentsService } from 'src/app/services/comments-service/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  comments: IComment[] = [];
  newComments: IComment[] = [];
  textComment: string = '';
  nameComment: string = '';
  articleId: number = 0;

  constructor(private commentsService: CommentsService, private aRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.filteredComments();
    this.commentsService.commentAdded.subscribe(() => this.filteredComments());
  }

  //Método para añadir comentarios nuevos
  async addComment(): Promise<void> {
    let newComment = {
      name: this.nameComment,
      text: this.textComment,
      articleId: this.articleId
    }

    if (newComment.name === '' || newComment.text === '') {
      alert("Campos vacíos");
      return;
    } else {
      let response = await this.commentsService.postComment(newComment);
      this.filteredComments();
      this.nameComment = '';  // Borrar el campo de nombre
      this.textComment = '';  // Borrar el campo de comentario   
    }
  }

  async filteredComments() {
    this.aRoute.params.subscribe(async (params: any) => {
      this.articleId = parseInt(params.id)
    })

    let resp = await this.commentsService.getAllComments();
    this.comments = resp;

    let newResponse = this.comments.filter(value => value.articleId == this.articleId);
    this.newComments = newResponse;
  }
}
