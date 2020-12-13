import { ProductAddComponent } from './../product-add/product-add.component';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = []

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private service: ProductService) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.service
      .getProducts()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.products = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onAdd() {
    const modalRef = this.modalService.open(ProductAddComponent, {size: 'lg'})
    modalRef.result.finally(() => {
      this.loadProducts()
    })
  }
}