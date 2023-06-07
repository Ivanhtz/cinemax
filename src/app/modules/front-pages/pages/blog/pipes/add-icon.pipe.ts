import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addIcon'
})
export class AddIconPipe implements PipeTransform {


  transform(value: string = ''): string {

    return value + ' ' + '📬';
  }

}
