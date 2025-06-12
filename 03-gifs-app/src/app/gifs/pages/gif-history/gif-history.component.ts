import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent {
  gifService = inject(GifsService)
  //query = inject(ActivatedRoute).params.subscribe((params) => { console.log(params['query']) })
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((data) => data['query'])
    ))

  gifByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query())
  })

}
