import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-subscription-item',
  templateUrl: './subscription-item.component.html',
  styleUrls: ['./subscription-item.component.scss'],
})
export class SubscriptionItemComponent implements OnInit {
  @Input() topic: string
  @Input() topicData: string

  constructor() {}

  ngOnInit(): void {}
}
