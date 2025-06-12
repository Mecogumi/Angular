import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';





@Component({
  selector: 'app-trending-page',
  //imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()
  }
  gifsService = inject(GifsService)
  scrollStateService = inject(ScrollStateService)
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')


  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight
    const scrollHeight = scrollDiv.scrollHeight

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight
    console.log(isAtBottom)
    this.scrollStateService.trendingScrollState.set(scrollTop)

    if (isAtBottom) {
      this.gifsService.loadTrendingGifs()

    }
  }
}
