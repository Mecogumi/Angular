import { Pipe, type PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormUtils } from '../utils/form-utils';

@Pipe({
  name: 'errorPipe',
})
export class ErrorPipe implements PipeTransform {
  transform(value: ValidationErrors | null) {
    if (!value) return null
    const key = Object.keys(value)
    console.log(value)
    switch (key[0]) {
      case 'required':
        return 'Este campo es requerido'
      case 'minlength':
        return `Debe contener al menos ${value['minlength']['requiredLength']} caracteres`
      case 'min':
        return `El valor minimo es ${value['min']['min']}`
      case 'email':
        return 'No es un email valido'
      case 'pattern':
        return this.regexErrorHelper(value['pattern'].requiredPattern)
      case 'passwordsNotEqual':
        return 'Las contraseñas no son iguales'
      case 'emailTaken':
        return 'El correo electronico ya se encuentra en uso'
      case 'usernameInvalid':
        return `El nombre de usuario ${value['username']} no esta permitido`
      default:
        return key
    }
  }

  regexErrorHelper(pattern: string): string {
    switch (pattern) {
      case FormUtils.emailPattern:
        return 'No es un email valido'
      case FormUtils.namePattern:
        return 'No cumple con el formato: "Nombre Apellido"'
      case FormUtils.notOnlySpacesPattern:
        return 'No debe de incluir espacios'
      default:
        return 'regex error'

    }
  }

}
