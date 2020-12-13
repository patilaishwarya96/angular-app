import { BrandEditComponent } from './../brand-edit/brand-edit.component';
import { BrandAddComponent } from './../brand-add/brand-add.component';
import { BrandService } from './../brand.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands = []

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private service: BrandService) { }

  ngOnInit(): void {
    this.loadBrands()
  }

  loadBrands() {
    this.service
      .getBrands()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.brands = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }
  
  onAdd() {
    const modalRef = this.modalService.open(BrandAddComponent)
    modalRef.result.finally(() => {
      // reload the categories
      this.loadBrands()
    })
  }

  onEdit(brand) {
    const modalRef = this.modalService.open(BrandEditComponent)

    // get the edit comopnent's reference
    const component = modalRef.componentInstance as BrandEditComponent

    // pre-fill the title and description
    component.title = brand.title
    component.description = brand.description
    component.id = brand.id

    modalRef.result.finally(() => {
      // reload the categories
      this.loadBrands()
    })
  }

  onDelete(brand) {
    this.service
      .deleteBrand(brand['id'])
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.loadBrands()
        } else {
          this.toastr.error(response['error'])
        }
      })
  }
}