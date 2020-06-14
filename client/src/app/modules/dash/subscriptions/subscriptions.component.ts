import { Component, OnInit } from '@angular/core'
import { SocketioService } from 'src/app/core/services/socketio/socketio.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import _ from 'lodash'

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  form: FormGroup
  jsonData: any
  constructor(public socketService: SocketioService, private fb: FormBuilder) {
    this.socketService.brokerDataObservable.subscribe((data) => {
      this.jsonData = _.cloneDeep(data)
    })
  }

  ngOnInit(): void {
    this.initialize()
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
