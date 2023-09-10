import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { RoleCheckService } from '../services/role-check.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  currentUser: any = {};
  patchUserForm: FormGroup;
  users: any = [];
  status: string = '';
  errorMessage: any = '';

  constructor(public fb: FormBuilder, public authService: AuthService, public userService: UserService) {

    this.patchUserForm = this.fb.group({                   
      id: [''],
      email: [''],
      name: [''],
      username: [''],
      password: [''],
    });
   }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    return this.userService.getUsers().subscribe((data: {}) => {
      this.users = data;
    });
  }

  loadCurrentUser(userId: string){
      this.userService.getUserById(userId).subscribe((data: {}) => {
        this.currentUser = data;
      });
    }

  deleteUser(id: number){
      this.userService.deleteUsers(id);
  }

  patchUsers(){
    this.userService.editUser(this.patchUserForm.value).subscribe({
      next: (res: any) => {
        window.location.reload()
        this.authService.showAlert('Votre changement a bien été effectué !', 'success')
      },
      error: (err: any) => {
        this.authService.showAlert('Impossible de modifier l\'utilisateur ! Vérifiez vos informations !', 'danger')
      }
    });
  }
}
