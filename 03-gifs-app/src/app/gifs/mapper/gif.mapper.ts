import { Gif } from "../interfaces/gif.interface";
import type { GiphyItem, GiphyResponse } from "../interfaces/giphy.interfaces";

export class GifMapper {

  static mapGiphyItemToGif(data: GiphyItem): Gif {
    return {
      id: data.id,
      title: data.title,
      url: data.images.original.url
    }
  }

  static mapGhypyItemsToGifArray(data: GiphyItem[]): Gif[] {
    return data.map(this.mapGiphyItemToGif)

  }
}
