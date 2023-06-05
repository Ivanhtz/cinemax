// user-datasource.ts
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { UserDto } from 'src/app/services/users-service/user-dto/user.dto';
import { UserService } from 'src/app/services/users-service/users.service';

export class UserDataSource extends DataSource<UserDto> {
  dataSource: UserDto[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  data: UserDto[] = [];

  constructor(private userService: UserService) {
    super();
    this.loadData();
  }

  loadData(): void {
    this.userService.getUsers().subscribe((users) => {
      this.data = users;
      this.paginator?._changePageSize(this.paginator.pageSize);
    });
  }

  connect(): Observable<UserDto[]> {
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

  private getPagedData(data: UserDto[]): UserDto[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: UserDto[]): UserDto[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'email':
          return compare(a.email, b.email, isAsc);
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
