// users-list-back.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/interfaces/iuser.interface';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-users-list-back',
  templateUrl: './users-list-back.component.html',
  styleUrls: ['./users-list-back.component.scss'],
})
export class UsersListBackComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'password', 'createdAt', 'edit', 'delete']; // Agrega 'createdAt'
  
  @Input() dataSource: MatTableDataSource<Iuser> = new MatTableDataSource<Iuser>();
  @Output() editUserEvent = new EventEmitter<number>();

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  deleteUser(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.usersService.deleteUser(id).subscribe(() => {
        alert('Usuario eliminado exitosamente');
        // Más acciones aquí
      });
    }
  }
  editUser(id: number): void {
    if (id) {
      console.log(`Editing user with ID: ${id}`);
      this.usersService.getUser(id).subscribe(user => {
        this.usersService.startEditingUser(user);
      });
    }
  }
  ngOnInit(): void {
    console.log('DataSource:', this.dataSource); // Log to check dataSource
  }
}