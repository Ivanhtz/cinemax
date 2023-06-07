import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgDefault'
})
export class ImgDefaultPipe implements PipeTransform {

  transform(imageUrl: string, defaultImageUrl: string = './assets/img/noimg.png'): string {
    // Verificar si la URL de la imagen es válida
    if (!imageUrl || imageUrl.trim() === '') {
      return defaultImageUrl;
    } else {
      // Si la URL de la imagen es válida, se devuelve tal cual
      return imageUrl;
    }
  }

}
