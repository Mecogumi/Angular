import { ChangeDetectionStrategy, Component, effect, ElementRef, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {

  queryOuput = output<string>()
  placeHolderText = input.required<string>()

  inputValue = signal<string>('')

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue()

    const timeout = setTimeout(() => {
      this.queryOuput.emit(value)
    }, 500);

    onCleanup(() => { clearTimeout(timeout) })
  })


}
