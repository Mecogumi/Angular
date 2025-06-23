import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value) return 'Puede volar'
    return 'No puede volar'
  }

}
