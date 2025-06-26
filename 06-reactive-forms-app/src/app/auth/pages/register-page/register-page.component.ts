import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { ErrorPipe } from '../../../pipes/Error.pipe';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule, ErrorPipe],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  formUtils = FormUtils
  private fb = inject(FormBuilder)
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)], FormUtils.checkingServerResponse],
    username: ['', [FormUtils.checkUsername, Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, FormUtils.isFieldOneEqualFieldTwo('password', 'confirmPassword')]]
  })



  onSumbit() {
    console.log(this.myForm.value)
    this.myForm.markAllAsTouched()
  }
}
