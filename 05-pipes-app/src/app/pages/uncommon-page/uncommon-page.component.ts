import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nPluralPipe, I18nSelectPipe, JsonPipe, SlicePipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe } from '@angular/common';
import { interval, tap } from 'rxjs';

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
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
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

  //I18nPluralPipe

  clientsMap = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    other: 'tenemos # clientes esperando'
  })

  clients = signal([
    'maria',
    'pedro',
    'fernando',
    'damian',
    'jose',
    'melissa',
    'mariana',
    'diana',
    'andrea'
  ])

  deleteClient() {
    this.clients.update((current) => current.slice(1))
  }

  //keyValuePipe
  profile = {
    name: 'Damian',
    age: 24,
    address: 'Merida'
  }

  //AsyncPipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa')
      console.log('promesa finalizada')
    }, 3500)
  })

  myObservableTimer = interval(2000).pipe(
    tap(value => console.log(value))
  )
}
