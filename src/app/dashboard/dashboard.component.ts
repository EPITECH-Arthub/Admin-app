import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleCheckService } from '../services/role-check.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  constructor(private authService: AuthService,
    private roleCheckService: RoleCheckService,
    public router: Router,
    public fb: FormBuilder) {
    }

  ngOnInit(): void {
     
    if(!this.authService.isLoggedIn || !this.roleCheckService.isAdmin()){
      this.router.navigate(['login']);
    }
  }

  
}
