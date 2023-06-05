import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { UserDto } from 'src/app/services/users-service/user-dto/user.dto';
import { UserService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-users-back',
  templateUrl: './users-back.component.html',
  styleUrls: ['./users-back.component.scss'],
})
export class UsersBackComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  users: MatTableDataSource<UserDto> = new MatTableDataSource<UserDto>();

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    // Primero, obtener los usuarios iniciales
    this.getUsersAndSetData();

    // Luego, cada vez que userUpdates$ emite, obtener los usuarios de nuevo
    this.userService.userUpdates$
      .pipe(switchMap(() => this.userService.getUsers()))
      .subscribe((users) => {
        this.users.data = users;
        if (this.paginator) {
          this.users.paginator = this.paginator;
        }
      });
  }

  private getUsersAndSetData(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.data = users;
      if (this.paginator) {
        this.users.paginator = this.paginator;
      }
    });
  }
}
