import { Component, Input } from '@angular/core';
import { Iuser } from 'src/app/interfaces/iuser.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  @Input() user: Iuser | any; 
  
}
