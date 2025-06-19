import { Injectable, signal } from '@angular/core';

export type AvailableLocal = 'es' | 'fr' | 'en'


@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private currentLocal = signal<AvailableLocal>('es')

  constructor() {
    this.currentLocal.set(localStorage.getItem('local') as AvailableLocal ?? 'es')

  }

  get getLocale() {
    return this.currentLocal()
  }

  changeLocale(local: AvailableLocal) {
    localStorage.setItem('local', local)
    this.currentLocal.set(local)
    window.location.reload()
  }
}
