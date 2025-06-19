import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";


@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe]
})
export class HeroPageComponent {
  public name = signal('Ironman');
  public age = signal(45)

  heroDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description;
  })

  capitalizedDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description.toUpperCase();
  })

  getHeroDescription() {
    return `${this.name()}-${this.age()}`
  }

  changeHero() {
    this.name.set('Spiderman')
    this.age.set(45)
  }

  changeAge() {
    this.age.set(60)
  }

  resetForm() {
    this.name.set('Ironman')
  }
}


