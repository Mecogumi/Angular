import { count } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
export class CountryMapper {


  private static restCountryToMappedCountry(country: RESTCountry) {
    const countryMapped: Country = {
      cca2: country.cca2,
      flag: country.flag,
      flagsvg: country.flags.svg,
      name: country.translations['spa'].common ?? 'No hay nombre en español',
      capital: country.capital.join(','),
      population: country.population,
      region: country.region
    }
    return countryMapped
  }

  static restCountriesToMappedCountries(countries: RESTCountry[]): Country[] {
    return countries.map(this.restCountryToMappedCountry)
  }

}
