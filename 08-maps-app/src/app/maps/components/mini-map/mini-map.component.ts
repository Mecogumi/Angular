import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { HouseProperty } from '../../../pages/houses-page/houses-page.component';
import mapboxgl, { Marker } from 'mapbox-gl'
import { environment } from '../../../../environments/environment';
mapboxgl.accessToken = environment.mapboxKey


@Component({
  selector: 'mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map')
  house = input.required<HouseProperty>()
  map = signal<mapboxgl.Map | null>(null)

  async ngAfterViewInit() {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 80);
    })
    if (!this.divElement()?.nativeElement) return
    const element = this.divElement()!.nativeElement
    const coords = this.house().lngLat
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: coords, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false
    });
    this.addListeners(map)
  }

  addListeners(map: mapboxgl.Map) {
    if (!map) return
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const marker = new Marker({ color: color }).setLngLat(this.house().lngLat)
    marker.addTo(map)
    this.map.set(map)
  }

}
