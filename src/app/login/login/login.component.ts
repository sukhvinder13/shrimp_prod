import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/services/login/login.service';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/store/reducers/auth.reducer';
import { login, logout } from 'app/store/actions/auth.actions';



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
    private toastrService: ToastrService,
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
    this.loginDetails = this._formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    setInterval(function () {
      localStorage.clear();
      localStorage.clear();
      this.router.navigate(['/login'])
        }, 10000);

  }
  get formControls() { return this.loginDetails.controls; }

  onSubmit() {
    if (this.loginDetails.invalid) {
      this.toastrService.warning('Please Fill the Mandatory Fields');
    } else {
      this._service.loginUser(this.loginDetails.value).subscribe(res => {
        if (res.isAuth) {
          localStorage.setItem('userInfo', res.token.name);
          localStorage.setItem('_id', res.token._id);
          localStorage.setItem('access_token', res.jwtToken);
          localStorage.setItem('userInfo', res.token.name);
          this.toastrService.success(' Success!', 'Login Success!');
          this.onLogin(res.token.name,res.jwtToken)
          this.router.navigate(['/'])
        } else {
          this.toastrService.error(res.message);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 500) {
            this.toastrService.warning('Sorry!! You are not authorized for this Action');
            this.router.navigate(['/401'])
          } else {
            let errMesage = "An unknown errr";
            if (error.error.message) {
              errMesage = error.error.message
            }
            this.toastrService.warning(errMesage)
          }
        } else {
          this.toastrService.warning('internal error occured without any http error');
        }
      })
    }
  }
  onLogin(username: string, token: string) {
    this.store.dispatch(login({ username, token }));
  } 
  onLogout() {
    this.store.dispatch(logout());
  }
}
