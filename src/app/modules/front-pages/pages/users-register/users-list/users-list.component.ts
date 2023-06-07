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
  
  constructor (private usersService:UsersService){ }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(users => this.arrUsers = users);
  }

}
