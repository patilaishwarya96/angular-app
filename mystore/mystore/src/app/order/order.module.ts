import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';


@NgModule({
  declarations: [OrderHistoryComponent, OrderPreviewComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
