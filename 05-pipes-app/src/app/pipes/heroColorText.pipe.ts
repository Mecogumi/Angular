import { Pipe, type PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColorText',
})
export class HeroColorTextPipe implements PipeTransform {

  transform(value: Color): string {
    return ColorMap[value];
  }

}
