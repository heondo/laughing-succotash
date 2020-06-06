import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatToolbarModule,
} from '@angular/material/toolbar'
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
})
export class SharedModule { }
