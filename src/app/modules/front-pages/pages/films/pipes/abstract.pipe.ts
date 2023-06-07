import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abstract'
})
export class AbstractPipe implements PipeTransform {

  transform(texto: string, longitud: number): string {

    if (texto.length <= longitud) {
      return texto;
    }

    return texto.substring(0, longitud) + '...';
  }

}
