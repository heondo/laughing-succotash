import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket

  constructor() {
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT)
    this.socket.emit('my message', 'Hello from angular')
  }
}
