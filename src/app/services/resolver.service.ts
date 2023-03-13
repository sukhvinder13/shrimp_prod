import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
 
@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {
  constructor(private LoginService: LoginService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get Product in resolver...', route);
    return this.LoginService.loginUser('').pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
