import { Component, signal, provideZoneChangeDetection, computed, inject } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';
import { DragonballService } from '../../services/dragonball.service';

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
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonballsuper.html',
  styleUrl: './dragonballsuper.css'
})
export class DragonballSuperPageComponent {

  dragonballservice = inject(DragonballService)

}
