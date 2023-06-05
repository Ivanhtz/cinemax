import { Component, Input } from '@angular/core';
import { Iarticle } from 'src/app/interfaces/iarticle.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  @Input() article: Iarticle | any; 

}
