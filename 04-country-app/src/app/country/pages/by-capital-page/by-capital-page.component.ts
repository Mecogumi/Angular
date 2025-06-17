import { ChangeDetectionStrategy, Component, inject, resource, signal, ElementRef } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { ContryListComponent } from "../../components/contry-list/contry-list.component";
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { App } from '../../../app';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, ContryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService)
  countries = signal<Country[]>([])
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = signal(this.queryParam)

  countryResource = rxResource<Country[], { query: string }>({
    //params: () => ({ query: this.query() }),
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (params.query.trim() === '') return of([]);
      this.router.navigate(["/country/by-capital"], {
        queryParams: {
          query: params.query
        }
      })
      return this.countryService.searchByCapital(params.query)
    }
  })

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (params.query.trim() === '') return [];
  //     return await firstValueFrom(this.countryService.searchByCapital(params.query))
  //   }
  // })

  // isLoading = signal(false)
  // isError = signal<string | null>(null)

  // onSearch(value: string) {
  //   if (this.isLoading()) return
  //   this.isLoading.set(true)
  //   this.isError.set(null)
  //   this.countryService.searchByCapital(value).subscribe({
  //     next: (country) => {
  //       this.countries.set(country)
  //       this.isLoading.set(false)
  //       this.isError.set(null)
  //     },
  //     error: (error) => {
  //       this.countries.set([])
  //       this.isLoading.set(false)
  //       this.isError.set(`No se encontro un pais con esa capital ${value}`)
  //     }
  //   }

  //   )

  // }
}
