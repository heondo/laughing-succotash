import { Component, OnInit, Input, ElementRef } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() snav: MatSidenav
  constructor() {}

  ngOnInit() {
    this._init()
  }

  logout() {}

  private _init() {}
}
