import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { ContryListComponent } from "../../components/contry-list/contry-list.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, ContryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  onSearch(value: string) {
    console.log(value)
  }
}
