import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './countryPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  urlParams = inject(ActivatedRoute)

  query = computed(() => {
    return this.urlParams.params.subscribe((parameters) => console.log(parameters['query']))
  })

}
