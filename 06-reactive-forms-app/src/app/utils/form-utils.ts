import { AbstractControl, FormControl } from "@angular/forms";

export class FormUtils {


  static isValidField(field: AbstractControl) {
    return (field.errors && field.touched)
  }

}
