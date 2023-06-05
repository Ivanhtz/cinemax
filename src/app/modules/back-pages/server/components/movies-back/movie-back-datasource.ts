import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { MoviesService } from 'src/app/services/movies-service/movies.service';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';


export class MovieDataSource extends DataSource<Ifilm> {
  dataSource: Ifilm[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  data: Ifilm[] = [];

  constructor(private movieService: MoviesService) {
    super();
    this.loadData();
  }

  loadData(): void {
    this.movieService.getMovies().subscribe((films) => {
      this.data = films;
      this.paginator?._changePageSize(this.paginator.pageSize);
    });
  }

  connect(): Observable<Ifilm[]> {
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

  private getPagedData(data: Ifilm[]): Ifilm[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Ifilm[]): Ifilm[] {
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