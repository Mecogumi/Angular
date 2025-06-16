import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private httpClient = inject(HttpClient)

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase()
    return this.httpClient.get<RESTCountry[]>(`${environment.API_URL}/capital/${query}`)
      .pipe(
        map(resp => CountryMapper.restCountriesToMappedCountries(resp)),
        catchError(error => {
          console.log(error)
          return throwError(() => new Error(`No se pudieron obtener paises con la capital ${query}`))
        })
      )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase()
    return this.httpClient.get<RESTCountry[]>(`${environment.API_URL}/name/${query}`)
      .pipe(
        map(resp => CountryMapper.restCountriesToMappedCountries(resp)),
        delay(100),
        catchError((error) => {
          return throwError(() => new Error(error))
        })
      )
  }

  searchCountryByCode(query: string) {
    return this.httpClient.get<RESTCountry[]>(`${environment.API_URL}/alpha/${query}`).
      pipe(
        map(resp => CountryMapper.restCountriesToMappedCountries(resp)),
        map(countries => countries.at(0)),
        catchError((error) => { return throwError(() => new Error("error")) })
      )
  }


}
