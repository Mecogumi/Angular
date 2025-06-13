import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContryListComponent } from '../../components/contry-list/contry-list.component';

@Component({
  selector: 'app-by-region-page',
  imports: [ContryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent { }
