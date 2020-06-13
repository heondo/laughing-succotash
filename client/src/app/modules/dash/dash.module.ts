import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { SubscriptionsComponent } from './subscriptions/subscriptions.component'
import { SidePanelComponent } from './side-panel/side-panel.component'
import { PublishPanelComponent } from './publish-panel/publish-panel.component'
import { SubscriptionItemComponent } from './subscriptions/subscription-item/subscription-item.component'

@NgModule({
  declarations: [
    DashboardComponent,
    SubscriptionsComponent,
    SidePanelComponent,
    PublishPanelComponent,
    SubscriptionItemComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class DashModule {}
