import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {

  user !: any;

  constructor(private users: UsersService, private aRoute: ActivatedRoute) { }


  ngOnInit() {
    const id = this.aRoute.snapshot.params["id"];
    this.users.getUser(id)
      .subscribe(user => this.user = user);
  }
}


