import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocal, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPageComponent {
  localService = inject(LocaleService)
  currrentLocal = signal(inject(LOCALE_ID))
  nameLower = signal('damian')
  nameUpper = signal('DAMIAN')
  fullName = signal('joSE dAmIaN')

  customDate = signal(new Date())

  tickingDateEffect = effect((onClean) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date())
    }, 1000);
    onClean: () => {
      clearInterval(interval)
    }
  })

  changeLocal(local: AvailableLocal) {
    this.localService.changeLocale(local)
  }
}
