import { BrandService } from './../brand.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  title = ''
  description = ''

  constructor(
    private service: BrandService,
    private toastr: ToastrService,
    private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.modal.dismiss('cancel')
  }

  onAdd() {
    if (this.title.length == 0) {
      this.toastr.warning('please enter title')
    } else if (this.description.length == 0) {
      this.toastr.warning('please enter description')
    } else {
      this.service
        .addBrand(this.title, this.description)
        .subscribe(response => {
          this.modal.dismiss('ok')
        })
    }
  }

}