import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { Dragonball } from './pages/dragonball/dragonball';
import { DragonballSuperPageComponent } from './pages/dragonballsuper/dragonballsuper';

export const routes: Routes = [
  {
    path: '',
    component: CounterPageComponent
  },
  {
    path: 'hero',
    component: HeroPageComponent
  },
  {
    path: 'dragonball',
    component: Dragonball
  }, {
    path: 'dragonballsuper',
    component: DragonballSuperPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }


];
