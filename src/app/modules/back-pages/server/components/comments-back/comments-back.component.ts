import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IComment } from 'src/app/interfaces/icomment.interface';
import { CommentsService } from 'src/app/services/comments-service/comments.service';

@Component({
  selector: 'app-comments-back',
  templateUrl: './comments-back.component.html',
  styleUrls: ['./comments-back.component.scss'],
})
export class CommentsBackComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  comments: MatTableDataSource<IComment> = new MatTableDataSource<IComment>();

  constructor(private commentsService: CommentsService) {}

  ngAfterViewInit(): void {
    this.getCommentsAndSetData();
  }

  private getCommentsAndSetData(): void {
    this.commentsService.getAllComments().then((comments) => {
      this.comments.data = comments;
      if (this.paginator) {
        this.comments.paginator = this.paginator;
      }
    });
  }
}
