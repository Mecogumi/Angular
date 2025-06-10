import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../Interfaces/character.interface';

function loadFromLocalStorage(): Character[] {
  const characters = localStorage.getItem('characters')
  return characters ? JSON.parse(characters) : []
}

@Injectable({
  providedIn: 'root'
})
export class DragonballService {

  public characters = signal<Character[]>(loadFromLocalStorage())

  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()))
  })

  addCharacter(character: Character) {

    this.characters.update((current): Character[] => { return [...current, character] })
  }


}
