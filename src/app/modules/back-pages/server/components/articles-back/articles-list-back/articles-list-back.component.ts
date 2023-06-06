import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';
import { DialogContentComponent } from '../../dialog-content.component';
import { ArticlesService } from 'src/app/services/articles-service/articles.service';

@Component({
  selector: 'app-articles-list-back',
  templateUrl: './articles-list-back.component.html',
  styleUrls: ['./articles-list-back.component.scss'],
})
export class ArticlesListBackComponent {
  displayedColumns: string[] = ['id', 'title', 'edit', 'delete'];

  @Input() dataSource: MatTableDataSource<Iarticle> =
    new MatTableDataSource<Iarticle>();
  @Output() editArticleEvent = new EventEmitter<number>();

  constructor(
    private articlesService: ArticlesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  deleteArticle(id: number): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { message: '¿Está seguro de que desea eliminar este artículo?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.articlesService.deleteArticle(id).subscribe(() => {
          this.snackBar.open(
            `Artículo con ID ${id} eliminado exitosamente`,
            'Cerrar',
            { duration: 5000 }
          );
        });
      }
    });
  }

  editArticle(id: number): void {
    if (id) {
      this.articlesService.getArticleById(id).then((article) => {
        this.articlesService.startEditingArticle(article);
      });
    }
  }
}
