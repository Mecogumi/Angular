import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { ErrorPipe } from '../../../pipes/Error.pipe';
import { ErrorArrayPipe } from '../../../pipes/ErrorArray.pipe';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule, ErrorPipe, ErrorArrayPipe],
  templateUrl: './dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder)
  formUtils = FormUtils
  index = 0

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    favoriteGames: this.fb.array([
      ['Metal guear', [Validators.required, Validators.minLength(5)]],
      ['League of legends', [Validators.required, Validators.minLength(5)]]
    ], [Validators.required, Validators.minLength(3)])
  })

  newFavoriteGame = this.fb.control('', [Validators.required, Validators.minLength(5)])
  // newFavoriteGame = new FormControl('', [Validators.required, Validators.minLength(3)])

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      this.myForm.controls['favoriteGames'].markAllAsTouched()
      return
    }
    console.log(this.myForm.value)
  }

  onAddNewGame() {
    if (this.newFavoriteGame.invalid) return
    const newGame = this.newFavoriteGame.value
    const validators = [Validators.required, Validators.minLength(5)]
    let gametoadd = this.fb.control(newGame, validators)
    this.favoriteGames.push(gametoadd)
    this.newFavoriteGame.reset()
  }

  onDeleteEvent(index: number) {
    this.favoriteGames.removeAt(index)
    return
  }
}
