import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { SubscriptionsComponent } from './subscriptions/subscriptions.component'
import { SidePanelComponent } from './side-panel/side-panel.component'
import { PublishPanelComponent } from './publish-panel/publish-panel.component'
import { SubscriptionItemComponent } from './subscriptions/subscription-item/subscription-item.component'
import { NgxJsonViewerModule } from './../ngx-json-viewer/ngx-json-viewer.module'

@NgModule({
  declarations: [
    DashboardComponent,
    SubscriptionsComponent,
    SidePanelComponent,
    PublishPanelComponent,
    SubscriptionItemComponent,
  ],
  imports: [CommonModule, SharedModule, NgxJsonViewerModule],
})
export class DashModule {}
