import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500);
  })

}

export class FormUtils {
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(field: AbstractControl) {
    return (field.errors && field.touched)
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string): ValidationErrors | null {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.parent?.get(field1)?.value
      const field2Value = formGroup.parent?.get(field2)?.value
      return field1Value === field2Value ? null : { passwordsNotEqual: true }
    }
  }

  static checkUsername(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value
    if (formValue === "admin21") {
      return {
        usernameInvalid: true,
        username: formValue
      }
    }
    return null
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep()
    const formValue = control.value
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      }
    }
    return null
  }

}
