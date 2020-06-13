import { Injectable } from '@angular/core'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment'
import { Observable, BehaviorSubject } from 'rxjs'

export interface BrokerMessage {
  topic: string
  payload: any
}

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: SocketIOClient.Socket
  brokerSubscriptions: Observable<string[]>
  public brokerData = new BehaviorSubject<any>({})
  brokerDataObservable = this.brokerData.asObservable()
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
    this.socket.addEventListener('mqtt_message', (data: BrokerMessage) => {
      const currentData = this.brokerData.value
      this.brokerData.next({
        ...currentData,
        [data.topic]: data.payload,
      })
    })
  }

  publishMessage(topic: string, message: string): void {
    this.socket.emit(
      'publish',
      JSON.stringify({
        topic,
        message,
      })
    )
  }

  subscribeToTopic(topic: string): void {
    this.socket.emit(
      'subscribe',
      JSON.stringify({
        topic,
      })
    )
  }
}
