import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { SocketioService } from 'src/app/core/services/socketio/socketio.service'

@Component({
  selector: 'app-publish-panel',
  templateUrl: './publish-panel.component.html',
  styleUrls: ['./publish-panel.component.scss'],
})
export class PublishPanelComponent implements OnInit {
  form: FormGroup
  constructor(public socketService: SocketioService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initialize()
  }

  save() {
    const { topic, message } = this.form.value
    this.socketService.publishMessage(topic, message)
    this.form.reset()
  }

  private initialize() {
    const fbInitValues = {
      topic: ['', Validators.minLength(1)],
      message: ['', Validators.minLength(1)],
    }
    this.form = this.fb.group(fbInitValues)
  }
}
