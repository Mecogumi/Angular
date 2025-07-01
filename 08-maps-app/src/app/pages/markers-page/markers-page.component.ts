import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as UUIDV4 } from 'uuid'
import { JsonPipe } from '@angular/common';
mapboxgl.accessToken = environment.mapboxKey

interface MarkerInterface {
  id: string
  marker: mapboxgl.Marker
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map')
  map = signal<mapboxgl.Map | null>(null)
  Makrers = signal<MarkerInterface[]>([])

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(null)
      }, 80)
    })

    const element = this.divElement()?.nativeElement
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 14,
      center: [-89.6732, 20.9203]
    })
    // const marker = new mapboxgl.Marker({
    //   draggable: false,
    //   color: 'blue'
    // }).setLngLat([-89.6732, 20.9203]).addTo(map)

    // marker.on('dragend', (event) => {
    //   console.log(event.target.getLngLat())
    // })
    this.mapListener(map)
  }

  mapListener(map: mapboxgl.Map) {
    map.on('click', (event) => {
      this.mapClick(event)
    })

    this.map.set(map)

  }

  mapClick(event: MapMouseEvent) {
    if (!this.map()) return
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: color
    }).setLngLat(event.lngLat).addTo(this.map()!)

    const markertoadd: MarkerInterface = {
      id: UUIDV4(),
      marker: marker
    }
    this.Makrers.update(markers => [...markers, markertoadd])
    console.log(marker._color)
  }
  navigateToMarker(marker: MarkerInterface) {
    if (!this.map()) return
    const coords = marker.marker.getLngLat()
    this.map()?.flyTo({
      center: coords,
      zoom: 14
    })

  }

  deleteMarker(marker: MarkerInterface) {
    marker.marker.remove()
    this.Makrers.update(markers => markers.filter((mark) => mark.id != marker.id))

  }
}




// {
//   "latitud": "20.9203",
//   "longitud": "-89.6632"
// }
