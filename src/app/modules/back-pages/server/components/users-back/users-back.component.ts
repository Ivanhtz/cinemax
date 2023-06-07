import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Iuser } from 'src/app/interfaces/iuser.interface';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-users-back',
  templateUrl: './users-back.component.html',
  styleUrls: ['./users-back.component.scss'],
})
export class UsersBackComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  users: MatTableDataSource<Iuser> = new MatTableDataSource<Iuser>();

  constructor(private usersService: UsersService) {}

  ngAfterViewInit(): void {
    // Primero, obtener los usuarios iniciales
    this.getUsersAndSetData();

    // Luego, cada vez que userUpdates$ emite, obtener los usuarios de nuevo
    this.usersService.userUpdates$
      .pipe(switchMap(() => this.usersService.getUsers()))
      .subscribe((users) => {
        this.users.data = users;
        if (this.paginator) {
          this.users.paginator = this.paginator;
        }
      });
  }

  private getUsersAndSetData(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users.data = users;
      if (this.paginator) {
        this.users.paginator = this.paginator;
      }
    });
  }
}
