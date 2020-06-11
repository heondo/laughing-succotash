import { Component, OnInit } from '@angular/core'
import { SocketioService } from 'src/app/core/services/socketio/socketio.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  form: FormGroup
  constructor(public socketService: SocketioService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initialize()
  }

  save() {
    const { topic } = this.form.value
    this.socketService.subscribeToTopic(topic)
  }

  private initialize() {
    const fbInitValues = {
      topic: ['', Validators.required],
    }
    this.form = this.fb.group(fbInitValues)
  }
}
