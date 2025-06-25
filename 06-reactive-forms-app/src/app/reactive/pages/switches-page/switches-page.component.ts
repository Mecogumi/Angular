import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorPipe } from '../../../pipes/Error.pipe';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule, ErrorPipe],
  templateUrl: './switches-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPageComponent {
  formUtils = FormUtils

  private fb = inject(FormBuilder)

  myForm: FormGroup = this.fb.group({
    gender: [, Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  onSumbit() {
    if (this.myForm.invalid) return
    this.myForm.markAllAsTouched()
    console.log(this.myForm.value)
  }
}
