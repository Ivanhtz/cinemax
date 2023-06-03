import { Component } from '@angular/core';

export interface User {
  nombre: string;
  apellido: string;
  email: string;
}

const ELEMENT_DATA: User[] = [
  {nombre: 'Juan', apellido: 'Perez', email: 'juan.perez@mail.com'},
  {nombre: 'Ana', apellido: 'Gomez', email: 'ana.gomez@mail.com'},
  // agregar más datos de usuarios aquí...
];

@Component({
  selector: 'app-users-back',
  templateUrl: './users-back.component.html',
  styleUrls: ['./users-back.component.scss']
})
export class UsersBackComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'email'];
  dataSource = ELEMENT_DATA;
}