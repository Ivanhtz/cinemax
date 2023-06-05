import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';

import { ArticlesService } from 'src/app/services/articles-service/articles.service';

@Component({
  selector: 'app-articles-list-back',
  templateUrl: './articles-list-back.component.html',
  styleUrls: ['./articles-list-back.component.scss']
})
export class ArticlesListBackComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'edit', 'delete'];
  
  @Input() dataSource: MatTableDataSource<Iarticle> = new MatTableDataSource<Iarticle>();
  @Output() editArticleEvent = new EventEmitter<number>();

  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  deleteArticle(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este artículo?')) {
      this.articlesService.deleteArticle(id).subscribe(() => {
        alert('Artículo eliminado exitosamente');
        // Más acciones aquí
      });
    }
  }

  editArticle(id: number): void {
    if (id) {
      console.log(`Editing article with ID: ${id}`);
      this.articlesService.getArticleById(id).then(article => {
        this.articlesService.startEditingArticle(article);
      });
    }
  }

  ngOnInit(): void {
    console.log('DataSource:', this.dataSource); // Log to check dataSource
  }
}