import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private httpClient = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<string, Country[]>()



  searchByCapital(query: string): Observable<Country[]> {
    // console.log(`Emitiendo el valor ${query}`)
    // return of([])
    query = query.toLowerCase()
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? [])
    }


    return this.httpClient.get<RESTCountry[]>(`${environment.API_URL}/capital/${query}`)
      .pipe(
        map(resp => CountryMapper.restCountriesToMappedCountries(resp)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log(error)
          return throwError(() => new Error(`No se pudieron obtener paises con la capital ${query}`))
        })
      )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase()
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!).pipe(delay(5000))
    }
    return this.httpClient.get<RESTCountry[]>(`${environment.API_URL}/name/${query}`)
      .pipe(
        map(resp => CountryMapper.restCountriesToMappedCountries(resp)),
        delay(100),
        tap((respuestas) => this.queryCacheCountry.set(query, respuestas)),
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

  searchCountryByRegion(region: string) {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region))
    }
    return this.httpClient.get<RESTCountry[]>(`${environment.API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.restCountriesToMappedCountries(resp)),
      tap((res) => { this.queryCacheRegion.set(region, res) }),
      catchError((error) => { return throwError(() => new Error("error")) })
    )
  }


}
