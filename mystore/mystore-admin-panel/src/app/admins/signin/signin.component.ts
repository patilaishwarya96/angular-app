import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email = ''
  password = ''

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: AdminService) { }

  ngOnInit(): void {
  }

  onSignin() {
    if (this.email.length == 0) {
      this.toastr.warning('please enter email')
    } else if (this.password.length == 0) {
      this.toastr.warning('please enter password')
    } else {
      this.service
        .signin(this.email, this.password)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.toastr.success('welcome')
            
            // cache the user details along with the token
            const user = response['data']
            sessionStorage['user_name'] = user['firstName'] + ' ' + user['lastName']
            sessionStorage['token'] = user['token']

            this.router.navigate(['/product-list'])
          } else {
            this.toastr.error(response['error'])
          }
        })
    }
  }

}