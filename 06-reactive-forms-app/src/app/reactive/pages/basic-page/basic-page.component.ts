import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorPipe } from '../../../pipes/Error.pipe';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule, ErrorPipe],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent {
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })
  fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm = this.fb.group({
    // name : [valor inicial, validadores sincronos, validadores asiconronos]
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  // isErrorField(field: FormControl) {
  //   return (field.errors && field.touched)
  // }



  onSave() {
    if (this.myForm.invalid) {
      console.log('a')
      this.myForm.markAllAsTouched()
      return
    }
    console.log(this.myForm.value)
  }

}
