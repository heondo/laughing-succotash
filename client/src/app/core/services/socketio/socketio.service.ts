import { Injectable } from '@angular/core'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: SocketIOClient.Socket
  brokerSubscriptions: Observable<string[]>
  brokerData: Observable<any>
  // mqttSubscription: SocketIOClient.Socket

  constructor() {
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, { secure: true })
    console.log(this.socket)
    this.socket.on('connect', () =>
      console.log('connected to ' + environment.SOCKET_ENDPOINT)
    )

    // this.socket.addEventListener('mqtt_publish', (data) =>
    //   console.log('publish', data)
    // )
    this.socket.addEventListener('mqtt_message', (data) =>
      console.log('message', data)
    )
  }
}
