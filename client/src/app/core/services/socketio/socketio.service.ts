import { Injectable } from '@angular/core'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: SocketIOClient.Socket
  // mqttSubscription: SocketIOClient.Socket

  constructor() {
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT)
    console.log(this.socket)
    this.socket.on('connect', () =>
      console.log('connected to ' + environment.SOCKET_ENDPOINT)
    )

    // this.socket.on('mqtt_message', (data) => console.log(data))
    // this.socket.on('mqtt_message', (data) => console.log(data))
    // this.socket.emit(
    //   'publish',
    //   JSON.stringify({
    //     topic: 'house/bulbs/bulb1',
    //     message: 'OFF',
    //   })
    // )
    // this.socket.emit(
    //   'subscribe',
    //   JSON.stringify({
    //     topic: 'house/',
    //   })
    // )
    // this.mqttSubscription.on('publish', (data) => console.log(data))
  }
}
