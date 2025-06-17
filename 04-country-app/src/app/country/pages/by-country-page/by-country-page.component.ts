import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ContryListComponent } from '../../components/contry-list/contry-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { CountryMapper } from '../../mappers/country.mapper';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [ContryListComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countryService = inject(CountryService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = linkedSignal<string>(() => {
    console.log(this.queryParams)
    return this.queryParams
  })

  countryResource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (params.query.trim() === '') return of([])
      this.router.navigate(["/country/by-country"], {
        queryParams: {
          query: params.query
        }
      })
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
