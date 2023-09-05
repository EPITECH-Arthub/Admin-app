import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, public router: Router) { }

  login(credentials: { username: any; password: any; }): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'authenticate', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('auth-token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('auth-token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
    window.location.reload();
  }

  signOut(): void {
    window.localStorage.clear();
  }

}
