import { Component, OnInit, Input, ElementRef } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() snav: ElementRef
  constructor() {}

  ngOnInit() {
    this._init()
  }

  logout() {}

  private _init() {}
}
