import { Component } from "@angular/core";

@Component({
  template: `
  <h1>Counter: {{ counter}}</h1>
  <h2>Counter component page</h2>
  <button (click)="increaseBy(2)">+1</button>
  `
})

export class CounterPageComponent {
  counter: number = 10;

  increaseBy(value: number) {
    this.counter += value
  }
}
