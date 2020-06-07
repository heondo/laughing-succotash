import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { SocketioService } from './core/services/socketio/socketio.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'client'
  mobileQuery: MediaQueryList

  private mobileQueryListener: () => void

  constructor(
    private socketIOService: SocketioService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this.mobileQueryListener = () => changeDetectorRef.detectChanges()
    // tslint:disable-next-line
    this.mobileQuery.addListener(this.mobileQueryListener)
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line
    this.mobileQuery.removeListener(this.mobileQueryListener)
  }
}
