import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nSelectPipe } from '@angular/common';

const client1 = {
  name: 'Damian',
  gender: 'male',
  age: '24',
  address: 'Merida'
}


const client2 = {
  name: 'Dulce',
  gender: 'female',
  age: '55',
  address: 'Campeche'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe],
  templateUrl: './uncommon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPageComponent {

  //i18nSelect
  client = signal(client1)
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2)
      return
    }
    this.client.set(client1)
  }

}
