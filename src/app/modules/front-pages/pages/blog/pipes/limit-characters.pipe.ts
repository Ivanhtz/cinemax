import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCharacters'
})
export class LimitCharactersPipe implements PipeTransform {

  transform(value: string = 'No hay ningún comentario'): string {
    if (value.length > 280) {
      return value.substring(0, 280) + '.';
    }
    return value;
  }

}
