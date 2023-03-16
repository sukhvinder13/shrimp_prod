import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
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
  
  canActivate(route:ActivatedRouteSnapshot,state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> {
      console.log(this.service.isLoggedIn)
    if(this.service.isLoggedIn !== true){
      this.router.navigate(['/login']);
    }else{
      return;
    }
  }
  // canActivatse(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   if (this.authService.isLoggedIn !== true) {
  //     window.alert('Access not allowed!');
  //     this.router.navigate(['log-in']);
  //   }
  //   return true;
  // }
}
