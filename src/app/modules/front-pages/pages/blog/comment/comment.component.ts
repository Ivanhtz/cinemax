import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/interfaces/icomment.interface';
import { CommentsService } from 'src/app/services/comments-service/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  comments : IComment[]= [];
  newComments:IComment[]=[]; 
  articleId: number = 0;

  constructor(private commentsService:CommentsService, private aRoute: ActivatedRoute){ }



  async ngOnInit(): Promise <void> {


    this.filteredComments(); 

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
