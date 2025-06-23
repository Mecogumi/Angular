import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase'
})

export class ToggleCase implements PipeTransform {
  transform(value: string, upper: boolean): string {
    if (upper) return value.toLocaleUpperCase()
    return value.toLocaleLowerCase()

  }
}
