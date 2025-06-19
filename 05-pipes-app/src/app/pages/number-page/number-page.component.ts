import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-number-page',
  imports: [DecimalPipe, PercentPipe, CurrencyPipe],
  templateUrl: './number-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NumberPageComponent {
  totalSell = signal(2_310_231_023.55781923091)
  percent = signal(0.4856)
}
