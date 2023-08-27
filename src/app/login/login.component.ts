import { Component } from '@angular/core';
import { AppConstants } from '../common/app.constants';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import { RoleCheckService } from '../services/role-check.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;

  constructor(private authService: AuthService, 
              private roleCheckService: RoleCheckService,
              private tokenStorage: TokenStorageService, 
              private route: ActivatedRoute, 
              private userService: UserService, 
              public router: Router,
              public fb: FormBuilder) {
              }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).pipe(
      tap(data => {
        if(!this.roleCheckService.isAdminToken(data.accessToken)){
          return;
        }
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
      })
    ).subscribe(
      () => {},
      err => {
        this.errorMessage = err && err.error && err.error.message ? err.error.message : 'An error occurred during login.';
        this.isLoginFailed = true;
      }
    );
  }

  login(user: any): void {
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    this.router.navigate(['dashboard']);
  }
}
