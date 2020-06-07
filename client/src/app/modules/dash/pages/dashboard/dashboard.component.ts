import { Component, OnInit } from '@angular/core'
import { SocketioService } from 'src/app/core/services/socketio/socketio.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public socketService: SocketioService) {}

  ngOnInit(): void {}
}
