import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  fb = inject(FormBuilder)
  countryService = inject(CountryService)
  regions = signal<string[]>(this.countryService.regions)
  countriesByRegion = signal<Country[]>([])
  bordersByCountry = signal<Country[]>([])

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })

  onFormChanged = effect((onCleanup) => {
    const regionSuscription = this.onRegionChanged()
    const countrySuscription = this.onCountryChanged()
    onCleanup: () => {
      regionSuscription?.unsubscribe()
      countrySuscription?.unsubscribe()
    }
  })

  onRegionChanged() {
    return this.myForm.get('region')?.valueChanges.pipe(
      tap(() => { this.myForm.get('country')!.setValue('') }),
      tap(() => { this.myForm.get('border')!.setValue('') }),
      tap(() => { this.countriesByRegion.set([]) }),
      tap(() => { this.bordersByCountry.set([]) }),
      switchMap(region => this.countryService.getCountriesByRegion(region!))
    ).subscribe(countries => { this.countriesByRegion.set(countries) })
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges.pipe(
      tap(() => { this.myForm.get('border')!.setValue('') }),
      tap(() => { this.bordersByCountry.set([]) }),
      filter(value => value!.length > 0),
      switchMap(country => {
        return this.countryService.getCountryByAlphaCode(country!)
      }),
      switchMap((country) => {
        return this.countryService.getCountryBorderByCodes(country.borders)
      })
    ).subscribe(borders => { this.bordersByCountry.set(borders) })
  }

}
