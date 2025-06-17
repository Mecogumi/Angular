import { ChangeDetectionStrategy, Component, effect, ElementRef, input, linkedSignal, OnInit, output, signal } from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {

  queryOuput = output<string>()
  placeHolderText = input.required<string>()
  initialValue = input<string>('')

  inputValue = linkedSignal<string>(() => {
    console.log(this.initialValue())
    return this.initialValue()
  })



  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue()

    const timeout = setTimeout(() => {
      this.queryOuput.emit(value)
    }, 500);

    onCleanup(() => { clearTimeout(timeout) })
  })


}
