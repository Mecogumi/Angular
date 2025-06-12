import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchedGifs = signal<Gif[]>([])
  searchHistory = signal<Record<string, Gif[]>>(this.loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  trandingGifGroup = computed<Gif[][]>(() => {
    const groups = []
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3))
    }
    return groups
  })

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: 20,
        rating: 'r'
      }
    }).subscribe((data) => {
      const gifs = GifMapper.mapGhypyItemsToGifArray(data.data)
      this.trendingGifs.set(gifs)
      this.trendingGifsLoading.set(false)
    })

  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.apiKey,
        limit: 20,
        q: query,
        rating: 'r'
      }
    }).pipe(map((data) => data.data), map(item => GifMapper.mapGhypyItemsToGifArray(item)), tap((items) => {
      this.searchHistory.update(histor => ({
        ...histor, [query]: items,
      }))
    }))
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? []

  }

  loadToLocalStorage = effect(() => {
    const historyGifs = JSON.stringify(this.searchHistory())
    localStorage.setItem('gifs', historyGifs)
  })

  loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('gifs') ?? '{}')

  }

}
