import { Pipe, type PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorPipe',
})
export class ErrorPipe implements PipeTransform {

  transform(value: ValidationErrors | null) {
    if (!value) return null
    const key = Object.keys(value)
    switch (key[0]) {
      case 'required':
        return 'Este campo es requerido'
      case 'minlength':
        return `Debe contener al menos ${value['minlength']['requiredLength']} caracteres`
      case 'min':
        return `El valor minimo es ${value['min']['min']}`
      default:
        return null
    }
  }

}
