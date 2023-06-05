import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { ArticlesService } from 'src/app/services/articles-service/articles.service';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';

export class ArticleDataSource extends DataSource<Iarticle> {
  data: Iarticle[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private articleService: ArticlesService) {
    super();
    this.loadData();
  }

  async loadData(): Promise<void> {
    const articles = await this.articleService.getArticles();
    this.data = articles;
    if (this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  connect(): Observable<Iarticle[]> {
    if (this.paginator && this.sort) {
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  disconnect(): void {}

  private getPagedData(data: Iarticle[]): Iarticle[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Iarticle[]): Iarticle[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
