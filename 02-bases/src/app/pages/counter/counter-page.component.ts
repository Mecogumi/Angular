import { Component } from "@angular/core";

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})

export class CounterPageComponent {
  counter: number = 10;

  increaseBy(value: number) {
    this.counter += value;
  }
  decreaseBy(value: number) {
    this.counter -= value;
  }
  reset() {
    this.counter = 0
  }
}
