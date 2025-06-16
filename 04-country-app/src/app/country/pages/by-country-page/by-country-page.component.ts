import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { ContryListComponent } from '../../components/contry-list/contry-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { CountryMapper } from '../../mappers/country.mapper';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  imports: [ContryListComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countryService = inject(CountryService)
  query = signal('')

  countryResource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (params.query.trim() === '') return of([])
      return (this.countryService.searchByCountry(params.query))
    }
  })


  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (params.query.trim() === '') return []
  //     return await firstValueFrom(this.countryService.searchByCountry(params.query))
  //   }
  // })
}
