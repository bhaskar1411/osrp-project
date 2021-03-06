import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AuthLogin } from './auth-login.model';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(uname: string, email: string, password: string, role: string) {
    const authData: AuthData = {
      uname: uname,
      email: email,
      password: password,
      role: role
    };
    this.http
      .post(
        BACKEND_URL +"signup", authData
        ).subscribe(response => {
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
      .post<{token: string, role: string, expiresIn: number}>(
        BACKEND_URL+"login", authData)
      .subscribe( response => {
       console.log(response);
       const token = response.token;
       this.token = token;
       if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        if (response.role === 'admin'){
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
       }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn  / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log("setting time: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);

  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if ( !token || !expirationDate ) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
