import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories = []

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private service: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.service
      .getCategories()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.categories = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onAdd() {
    const modalRef = this.modalService.open(CategoryAddComponent)
    modalRef.result.finally(() => {
      // reload the categories
      this.loadCategories()
    })
  }

  onEdit(category) {
    const modalRef = this.modalService.open(CategoryEditComponent)

    // get the edit comopnent's reference
    const component = modalRef.componentInstance as CategoryEditComponent

    // pre-fill the title and description
    component.title = category.title
    component.description = category.description
    component.id = category.id

    modalRef.result.finally(() => {
      // reload the categories
      this.loadCategories()
    })
  }


  onDelete(category) {
    this.service
      .deleteCategory(category['id'])
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.loadCategories()
        } else {
          this.toastr.error(response['error'])
        }
      })
  }


}
