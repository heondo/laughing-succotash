import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: SocketIOClient.Socket
  mqttData

  constructor() {
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT)
    this.mqttData = this.socket.emit(
      'subscribe',
      JSON.stringify({
        topic: 'house/bulbs/bulb1',
      })
    )
    console.log(this.mqttData)
  }
}
