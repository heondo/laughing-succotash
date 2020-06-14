import { Injectable } from '@angular/core'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment'
import { Observable, BehaviorSubject } from 'rxjs'
import _ from 'lodash'

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

  constructor() {
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, { secure: true })
    this.socket.addEventListener(
      'mqtt_message',
      ({ topic, payload }: BrokerMessage) => {
        const currentData = this.brokerData.value
        const topicsSplit = topic.split('/')
        const topicsNestedObject = {}
        this.customAssign(topicsNestedObject, topicsSplit, payload)
        const stateNewMessageMerged = _.merge(currentData, topicsNestedObject)
        this.brokerData.next(stateNewMessageMerged)
      }
    )

    this.socket.on('connect', () =>
      // console.log('connected to ' + environment.SOCKET_ENDPOINT)
      this.socket.emit(
        'subscribe',
        JSON.stringify({
          topic: '#',
        })
      )
    )
  }

  customAssign(obj = {}, keyPath: string[], value: any) {
    const lastKeyIndex = keyPath.length - 1
    for (let i = 0; i < lastKeyIndex; ++i) {
      const key = keyPath[i]
      if (!(key in obj)) {
        obj[key] = {}
      }
      obj = obj[key]
    }
    obj[keyPath[lastKeyIndex]] = value
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
