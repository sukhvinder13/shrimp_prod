import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL :any="";

  constructor(
    private http:HttpClient
  ) {
   }

  loginUser(loginDetails){
    return this.http.post<any>( environment.baseUrl+'/login',loginDetails);
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
}
