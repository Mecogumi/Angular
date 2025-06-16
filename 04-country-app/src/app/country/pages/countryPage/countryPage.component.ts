import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './countryPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countryService = inject(CountryService)
  urlParams: string = inject(ActivatedRoute).snapshot.params['query'];

  countryResource = rxResource({
    params: () => ({ query: this.urlParams }),
    stream: ({ params }) => {
      if (params.query.trim() === '') return of();
      console.log('aaa')
      return this.countryService.searchCountryByCode(params.query)
    }
  })

  // query = computed(() => {
  //   return this.urlParams.params.subscribe((parameters) => console.log(parameters['query']))
  // })

}
