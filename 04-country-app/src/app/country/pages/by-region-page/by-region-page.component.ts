import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { ContryListComponent } from '../../components/contry-list/contry-list.component';
import { Region } from '../../interfaces/region.types';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase()
  const valideRegions: Record<string, Region> = {
    africa: "Africa",
    americas: "Americas",
    asia: "Asia",
    europe: "Europe",
    oceania: "Oceania",
    antarctic: "Antarctic"
  }
  return valideRegions[queryParam] ?? 'Americas'
}


@Component({
  selector: 'app-by-region-page',
  imports: [ContryListComponent, NgClass],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  countryService = inject(CountryService)
  countries = signal<Country[]>([])
  activatedRoute = inject(ActivatedRoute)
  queryParams = (this.activatedRoute.snapshot.queryParamMap.get('query') ?? '')
  query = linkedSignal<Region>(() => validateQueryParam(this.queryParams))
  router = inject(Router)


  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  resource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (this.query().trim() === '') {
        return of([])
      }
      this.router.navigate(["/country/by-region"], {
        queryParams: {
          query: params.query
        }
      })
      return (this.countryService.searchCountryByRegion(params.query))
    }
  }
  )

}
