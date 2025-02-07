import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from 'app/services/login/login.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ResolverService  {
  constructor(private LoginService: LoginService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.LoginService.loginUser('').pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
