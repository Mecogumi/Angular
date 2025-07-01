import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { timeout } from 'rxjs';

mapboxgl.accessToken = environment.mapboxKey


@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
  div{
    width:100vw;
    height: calc( 100vh - 64px);
  }
  #controls{
    background-color:white;
    padding:10px;
    border-radius:5px;
    position:fixed;
    bottom:20px;
    right:20px;
    z-index:9999;
    box-shadow: 0 0 10px 0 rgb(0,0,0,0.1);
    border: 1px solid #e2e8f0;
    width: 250px;
  }
  `
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('mapa')
  map = signal<mapboxgl.Map | null>(null)
  zoom = signal<number>(14)
  coordinates = signal({
    lng: -75.5,
    lat: 40
  })

  zoomEffect = effect(() => {
    if (!this.map()) return
    this.map()?.zoomTo(this.zoom())
  })

  async ngAfterViewInit() {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 80)
    })
    if (!this.divElement()?.nativeElement) return
    const element = this.divElement()!.nativeElement
    const { lng, lat } = this.coordinates()
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });
    this.mapListeners(map)
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (event) => {
      const newzoom = event.target.getZoom()
      this.zoom.set(newzoom)
    })

    map.on('moveend', (event) => {
      // const center = event.target.getCenter()
      const center = map.getCenter()
      this.coordinates.set(center)
    })

    map.addControl(new mapboxgl.FullscreenControl)
    map.addControl(new mapboxgl.NavigationControl)
    map.addControl(new mapboxgl.GeolocateControl)
    map.addControl(new mapboxgl.ScaleControl)
    map.addControl(new mapboxgl.AttributionControl)


    this.map.set(map)
  }
}
