// users-list-back.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Iuser } from 'src/app/interfaces/iuser.interface';
import { UsersService } from 'src/app/services/users-service/users.service';
import { DialogContentComponent } from '../../dialog-content.component';

@Component({
  selector: 'app-users-list-back',
  templateUrl: './users-list-back.component.html',
  styleUrls: ['./users-list-back.component.scss'],
})
export class UsersListBackComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'email',
    'password',
    'createdAt',
    'edit',
    'delete',
  ];

  @Input() dataSource: MatTableDataSource<Iuser> =
    new MatTableDataSource<Iuser>();
  @Output() editUserEvent = new EventEmitter<number>();

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { message: '¿Está seguro de que desea eliminar este usuario?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.usersService.deleteUser(id).subscribe(() => {
          this.snackBar.open(
            `Usuario con ID ${id} eliminado exitosamente`,
            'Cerrar',
            { duration: 5000 }
          );
        });
      }
    });
  }

  editUser(id: number): void {
    if (id) {
      console.log(`Editing user with ID: ${id}`);
      this.usersService.getUser(id).subscribe((user) => {
        this.usersService.startEditingUser(user);
      });
    }
  }

  ngOnInit(): void {
    console.log('DataSource:', this.dataSource);
  }
}
