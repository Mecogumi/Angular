import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import type { Character } from '../../../Interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAddComponent {
  name = signal<string>('')
  power = signal<number>(0)

  newCharacter = output<Character>()

  addCharacter() {
    console.log(this.name())
    console.log(this.power())
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }
    const id = Math.floor(Math.random() * 1000)
    const character: Character = {
      id: id,
      name: this.name(),
      power: this.power()
    }
    console.log(character)
    this.newCharacter.emit(character)
    //this.characters.update((current): Character[] => { return [...current, character] })
    this.resetFields()
  }

  resetFields() {
    this.name.set('')
    this.power.set(0)
  }
}
