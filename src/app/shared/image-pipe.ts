import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  transform(value: string): string {
    if(value){
      return value;
    }
    return 'sin-imagen.png';
  }
}
