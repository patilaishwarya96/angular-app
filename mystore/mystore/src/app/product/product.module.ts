import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [GalleryComponent, CartComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
