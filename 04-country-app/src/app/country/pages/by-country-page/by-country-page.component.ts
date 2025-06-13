import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContryListComponent } from '../../components/contry-list/contry-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';

@Component({
  selector: 'app-by-country-page',
  imports: [ContryListComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  onSearch(value: string) {
    console.log(value)
  }
}
