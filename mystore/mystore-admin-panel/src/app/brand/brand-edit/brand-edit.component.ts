import { BrandService } from './../brand.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  title = ''
  description = ''
  id = 0

  constructor(
    private service: BrandService,
    private toastr: ToastrService,
    private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.modal.dismiss('cancel')
  }

  onUpdate() {
    if (this.title.length == 0) {
      this.toastr.warning('please enter title')
    } else if (this.description.length == 0) {
      this.toastr.warning('please enter description')
    } else {
      this.service
        .editBrand(this.id, this.title, this.description)
        .subscribe(response => {
          this.modal.dismiss('ok')
        })
    }
  }


}