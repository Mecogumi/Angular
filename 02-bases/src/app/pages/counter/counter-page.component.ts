import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CounterPageComponent {
  counter: number = 10;
  counterSingal = signal(10)

  constructor() {
    setInterval(() => {
      this.counter += 1;
      //this.counterSingal.update((current) => current + 1)
    }, 2000);
  }

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
