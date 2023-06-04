import { Component, Input } from '@angular/core';
import { Ifilm } from 'src/app/interfaces/ifilm.interface';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent {

  @Input() movie: Ifilm | any;

}
