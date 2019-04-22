import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AuthLogin } from './auth-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }

  createUser(uname: string, email: string, password: string, role: string) {
    const authData: AuthData = {
      uname: uname,
      email: email,
      password: password,
      role: role
    };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/admin']);
      });
  }

  login(email: string, password: string) {
    const authData: AuthLogin = {
      //uname: uname,
      email: email,
      password: password
      //role: role
    };
    this.http
      .post<{role: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe( response => {
      console.log(response);
      if(response.role === 'admin'){
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    });
  }



}
