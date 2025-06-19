import { NgClass } from '@angular/common';
import { Component, signal, provideZoneChangeDetection, computed } from '@angular/core';
import { concat } from 'rxjs';

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
  public name = signal<string>('')
  public power = signal<number>(0)

  public characters = signal<Character[]>([
    { id: 1, name: "Goku", power: 9001 },
    { id: 2, name: "Vegeta", power: 9000 }
  ])

  public powerClasses = (character: Character) => computed(() => {
    return {
      'text-danger': character.power > 9000
    }
  })

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }
    const id = this.characters().length + 1
    console.log(id)
    const character: Character = {
      id: id,
      name: this.name(),
      power: this.power()
    }
    this.characters.update((current): Character[] => { return [...current, character] })
    this.resetFields()
  }

  resetFields() {
    this.name.set('')
    this.power.set(0)
  }

}
