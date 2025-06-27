import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, JsonPipe, AsyncPipe],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  routes = routes.map(route => ({
    path: route.path,
    title: `${route.title}`
  })).filter((route) => route.path != '**')

  router = inject(Router)
  pageTitle = toSignal(this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    tap((event) => console.log(event)),
    map((event) => event.url),
    map((url) => routes.find((route) => `/${route.path}` === url)?.title ?? '')
  ))

}
