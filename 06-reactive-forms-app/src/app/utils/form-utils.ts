import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

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

}
