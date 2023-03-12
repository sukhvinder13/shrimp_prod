import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private role :String;
  constructor(
    private router:Router,
    private service:LoginService
  ){}
  
  canActivate(route:ActivatedRouteSnapshot):boolean {
    if(this.service.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
