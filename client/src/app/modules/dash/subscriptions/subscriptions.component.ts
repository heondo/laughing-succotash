import { Component, OnInit, OnDestroy } from '@angular/core'
import { SocketioService } from 'src/app/core/services/socketio/socketio.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import _ from 'lodash'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  form: FormGroup
  brokerData: any
  socketBroker$: Subscription
  constructor(public socketService: SocketioService, private fb: FormBuilder) {
    this.socketBroker$ = this.socketService.brokerDataObservable.subscribe(
      (data) => {
        this.brokerData = _.cloneDeep(data)
      }
    )
  }

  ngOnInit(): void {
    this.initialize()
  }

  ngOnDestroy() {
    this.socketBroker$.unsubscribe()
  }

  save() {
    const { topic } = this.form.value
    this.socketService.subscribeToTopic(topic)
  }

  private initialize() {
    const fbInitValues = {
      topic: ['', Validators.minLength(1)],
    }
    this.form = this.fb.group(fbInitValues)
  }
}
