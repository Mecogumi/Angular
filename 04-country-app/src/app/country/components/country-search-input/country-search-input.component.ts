import { ChangeDetectionStrategy, Component, ElementRef, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {

  queryOuput = output<string>()
  placeHolderText = input.required<string>()



  onSearch(query: string) {
    this.queryOuput.emit(query)
  }
}
