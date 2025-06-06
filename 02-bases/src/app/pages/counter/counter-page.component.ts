import { Component, signal, Signal } from "@angular/core";

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})

export class CounterPageComponent {
  counter: number = 10;
  counterSingal = signal(10)

  increaseBy(value: number) {
    this.counter += value;
    this.counterSingal.update((current) => current + value)
  }
  decreaseBy(value: number) {
    this.counter -= value;
    this.counterSingal.update((current) => current - value)
  }
  reset() {
    this.counter = 0
    this.counterSingal.set(0);
  }
}
