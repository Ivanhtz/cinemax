// comments-list-back.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IComment } from 'src/app/interfaces/icomment.interface';
import { CommentsService } from 'src/app/services/comments-service/comments.service';
import { DialogContentComponent } from '../../dialog-content.component';

@Component({
  selector: 'app-comments-list-back',
  templateUrl: './comments-list-back.component.html',
  styleUrls: ['./comments-list-back.component.scss'],
})
export class CommentsListBackComponent {
  displayedColumns: string[] = ['id', 'name', 'text', 'delete'];

  @Input() dataSource: MatTableDataSource<IComment> =
    new MatTableDataSource<IComment>();

  constructor(
    private commentsService: CommentsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  deleteComment(id: number): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { message: '¿Está seguro de que desea eliminar este comentario?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.commentsService.deleteComment(id).subscribe(() => {
          this.snackBar.open(
            `Comentario con ID ${id} eliminado exitosamente`,
            'Cerrar',
            { duration: 5000 }
          );

          // Actualizar la fuente de datos de la tabla
          this.commentsService.refreshComments().subscribe((comments) => {
            this.dataSource = new MatTableDataSource<IComment>(comments);
          });
        });
      }
    });
  }
}
