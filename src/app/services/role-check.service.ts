import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleCheckService {

  constructor(private tokenStorage: TokenStorageService) { }

    isAdmin(): boolean {
    if (this.tokenStorage.getToken()) {
      const currentUser = this.tokenStorage.getUser();
      if (currentUser.role == "ROLE_ADMIN") {
        return true;
      }
    }
    return false;
  }

  isAdminToken(jwt_token: string): boolean {

    let decoded_token : any = jwt_decode(jwt_token);
      if (decoded_token.role == "ROLE_ADMIN") {
        return true;
      }
    return false;
  }

}


