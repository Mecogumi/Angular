import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layout/country-layout/country-layout.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      }
    ]
  },
  // {
  //   path: 'country'
  // },

];

export default countryRoutes;
