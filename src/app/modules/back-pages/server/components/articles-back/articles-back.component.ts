import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';
import { ArticlesService } from 'src/app/services/articles-service/articles.service';

@Component({
  selector: 'app-articles-back',
  templateUrl: './articles-back.component.html',
  styleUrls: ['./articles-back.component.scss'],
})
export class ArticlesBackComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  articles: MatTableDataSource<Iarticle> = new MatTableDataSource<Iarticle>();

  constructor(private articlesService: ArticlesService) {}

  ngAfterViewInit(): void {
    // Primero, obtener los artículos iniciales
    this.getArticlesAndSetData();

    // Luego, cada vez que articleUpdates$ emite, obtener los artículos de nuevo
    this.articlesService.articleUpdates$
      .pipe(switchMap(() => this.articlesService.getArticles()))
      .subscribe((articles) => {
        this.articles.data = articles;
        if (this.paginator) {
          this.articles.paginator = this.paginator;
        }
      });
  }

  private async getArticlesAndSetData(): Promise<void> {
    const articles = await this.articlesService.getArticles();
    this.articles.data = articles;
    if (this.paginator) {
      this.articles.paginator = this.paginator;
    }
  }
}