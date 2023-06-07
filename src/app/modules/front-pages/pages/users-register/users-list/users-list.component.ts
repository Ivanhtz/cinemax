import { Component } from '@angular/core';
import { Iuser } from 'src/app/interfaces/iuser.interface';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  arrUsers: Iuser[] = [];
  filteredUsers: Iuser[] = []; //almacena los usuarios según su estado
  filterOptions = ['Todos', 'Activos', 'Inactivos']; //opciones del filtro
  selectedFilterOption = 'Todos'; //opción por defecto, para mostrar todos los usuarios cuando cargamos la página

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(users => {
        this.arrUsers = users;
        this.filterUsers();
      });
  }

  filterUsers() {
    if (this.selectedFilterOption === 'Todos') {
      this.filteredUsers = this.arrUsers;
    } else {
      const isActive = this.selectedFilterOption === 'Activos';
      this.filteredUsers = this.arrUsers.filter(user => user.active === isActive);
    }
  }

  //Método para actualizar la selección. Se invoca cuando cambiamos la opción en la barra de filtrado. 
  onFilterOptionChange() {
    this.filterUsers();
  }
}

