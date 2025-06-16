import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'contry-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './contry-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContryListComponent {
  countries = input.required<Country[]>()

  errorMessage = input<string | unknown>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(true)




}
