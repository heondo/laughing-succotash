import { Component, OnInit } from '@angular/core'
import { SocketioService } from 'src/app/core/services/socketio/socketio.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent implements OnInit {
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
      message: ['', Validators.required],
    }
    this.form = this.fb.group(fbInitValues)
  }
}
