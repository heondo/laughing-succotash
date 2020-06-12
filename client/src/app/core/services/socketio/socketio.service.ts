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
    // when i subscribe to a topic i will get all of the data children, separately
    this.socket.addEventListener('mqtt_message', (data: BrokerMessage) => {
      const currentData = this.brokerData.value
      this.brokerData.next({
        ...currentData,
        [data.topic]: data.payload,
      })

      console.log(this.brokerData.value)
    })
  }

  publishDummy() {
    this.socket.emit(
      'publish',
      JSON.stringify({
        topic: 'house/bulbs/bulb1',
        message: 'OFF',
      })
    )
  }

  publishDummy2() {
    this.socket.emit(
      'publish',
      JSON.stringify({
        topic: 'house/bulbs/bulb2',
        message: 'OFF',
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
