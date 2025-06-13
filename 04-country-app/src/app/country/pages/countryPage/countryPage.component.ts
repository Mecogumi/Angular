import { ChangeDetectionStrategy, Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './countryPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  constructor() {
  }
}
