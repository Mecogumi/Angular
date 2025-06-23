import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ToggleCase } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { CanFlyPipe } from '../../pipes/canFly.pipe';
import { HeroColorPipe } from '../../pipes/heroColor.pipe';
import { HeroColorTextPipe } from '../../pipes/heroColorText.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../pipes/heroCreator.pipe';
import { HeroSortByPipe } from '../../pipes/heroSortBy.pipe';
import { Hero } from '../../interfaces/hero.interface';
import { HeroFilterPipe } from '../../pipes/heroFilter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [HeroFilterPipe, ToggleCase, CanFlyPipe, HeroColorPipe, HeroColorTextPipe, TitleCasePipe, HeroCreatorPipe, HeroSortByPipe],
  templateUrl: './custom-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomPageComponent {
  name = signal('Jose Damian')
  upperCase = signal(true)
  heroes = signal(heroes)
  sortBy = signal<keyof Hero | null>(null)
  searchQuery = signal<string>('')

  toggleUpperCase() {
    this.upperCase.set(!this.upperCase())
  }



}
