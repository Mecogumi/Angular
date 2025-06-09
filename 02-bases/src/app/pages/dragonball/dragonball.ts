import { NgClass } from '@angular/common';
import { Component, signal, provideZoneChangeDetection, computed } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}
class char {
  id = signal(1)
}

@Component({
  selector: 'app-dragonball',
  imports: [NgClass],
  templateUrl: './dragonball.html',
  styleUrl: './dragonball.css'
})
export class Dragonball {
  public characters = signal<Character[]>([
    { id: 1, name: "Goku", power: 9001 },
    { id: 2, name: "Vegeta", power: 9000 },
    { id: 3, name: "Piccolo", power: 8000 },
    { id: 4, name: 'yamcha', power: 502 }
  ])

  public powerClasses = (character: Character) => computed(() => {
    console.log(character.name)
    return {
      'text-danger': character.power > 9000
    }
  })

}
