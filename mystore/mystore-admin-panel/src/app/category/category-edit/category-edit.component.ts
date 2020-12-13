import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  title = ''
  description = ''
  id = 0

  constructor(
    private service: CategoryService,
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
        .editCategory(this.id, this.title, this.description)
        .subscribe(response => {
          this.modal.dismiss('ok')
        })
    }
  }

}
