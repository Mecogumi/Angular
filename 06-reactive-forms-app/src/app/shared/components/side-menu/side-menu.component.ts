import { ChangeDetectionStrategy, Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import authRoutes from '../../../auth/auth.routes';
import { countryRoutes } from '../../../country/country.routes';

interface MenuItem {
  title: string
  route: string
}
const reactiveItems = reactiveRoutes[0].children ?? []
const authItems = authRoutes[0].children ?? []
const countryItems = countryRoutes[0].children ?? []

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {

  reactiveMenu: MenuItem[] = reactiveItems.filter((item) => item.path != '**').map((item) => ({
    route: `reactive/${item.path}`,
    title: `${item.title}`
  }))

  authMenu: MenuItem[] = authItems.filter((item) => item.path != '**').map((item) => ({
    title: `${item.title}`,
    route: `auth/${item.path}`
  }))

  countryMenu: MenuItem[] = countryItems.filter((item) => item.path != '**').map((item) => ({
    title: `${item.title}`,
    route: `country/${item.path}`
  }))
}
