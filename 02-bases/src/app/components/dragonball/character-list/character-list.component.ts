import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { Character } from '../../../Interfaces/character.interface';
import { NgClass } from '@angular/common';
@Component({
  selector: 'dragonball-character-list',
  imports: [NgClass],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {
  characters = input<Character[]>()
  listNamee = input<string>()

  public powerClasses = (character: Character) => computed(() => {
    return {
      'text-danger': character.power > 9000
    }
  })

}
