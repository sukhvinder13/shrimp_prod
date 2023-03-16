import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from 'app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails: UntypedFormGroup;
  isSubmitted: false;
  constructor(private _formbuilder: UntypedFormBuilder,
    private _service: LoginService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.loginDetails = this._formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get formControls() { return this.loginDetails.controls; }

  onSubmit() {
    isSubmitted: true;
    if (this.loginDetails.invalid) {
      alert('Please Fill the Mandatory Fields');
    } else {
      console.log(this.loginDetails.value);
      this._service.loginUser(this.loginDetails.value).subscribe(res => {
        console.log(res);
        if (res.isAuth) {
          localStorage.setItem('userInfo', res.token.name);
          localStorage.setItem('access_token', res.jwtToken);
          console.log('success');
          localStorage.setItem('userInfo', res.token.name);
          this.router.navigate(['/'])
        } else {
          alert(res.message);
        }
      }, error => {
        // console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 500) {
            alert('Sorry!! You are not authorized for this Action');
            this.router.navigate(['/401'])
          } else {
            let errMesage = "An unknown errr";
            if (error.error.message) {
              errMesage = error.error.message
            }
            alert(errMesage)
            // alert('internal error occured')
          }
        } else {
          alert('internal error occured without any http error');
        }
      })
    }
  }

}