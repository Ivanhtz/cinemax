// users-list-back.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/services/users-service/user-dto/user.dto';
import { UserService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-users-list-back',
  templateUrl: './users-list-back.component.html',
  styleUrls: ['./users-list-back.component.scss'],
})
export class UsersListBackComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'password', 'createdAt', 'edit', 'delete']; // Agrega 'createdAt'
  
  @Input() dataSource: MatTableDataSource<UserDto> = new MatTableDataSource<UserDto>();
  @Output() editUserEvent = new EventEmitter<number>();

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  deleteUser(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        alert('Usuario eliminado exitosamente');
        // Más acciones aquí
      });
    }
  }
  editUser(id: number): void {
    if (id) {
      console.log(`Editing user with ID: ${id}`);
      this.userService.getUser(id).subscribe(user => {
        this.userService.startEditingUser(user);
      });
    }
  }
  ngOnInit(): void {
    console.log('DataSource:', this.dataSource); // Log to check dataSource
  }
}