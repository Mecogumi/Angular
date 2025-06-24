import { Pipe, type PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorArrayPipe',
})
export class ErrorArrayPipe implements PipeTransform {

  transform(value: ValidationErrors | null) {
    if (!value) return null
    const key = Object.keys(value)
    switch (key[0]) {
      case 'required':
        return 'Deben existir elementos'
      case 'minlength':
        return `Debe contener al menos ${value['minlength']['requiredLength']} elementos`
      case 'min':
        return `El valor minimo es ${value['min']['min']}`
      default:
        return null
    }
  }

}
