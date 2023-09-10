import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AppConstants } from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/me', httpOptions);
  }

  // Load User

  getUsers(): Observable<any> {
    return this.http
      .get<any>(AppConstants.API_URL + 'users')
      .pipe(retry(1), catchError(this.handleError));
  }

  // Delete User

  deleteUsers(id: number): void {
    this.http.delete(AppConstants.API_URL + 'users/' + id)
        .subscribe(() => window.location.reload());
  }

  // Edit User

  editUser(user: any): Observable<any> {
    return this.http.put(AppConstants.API_URL +user.id, user).pipe(catchError(this.handleError));
  }

  // Get user by id

  getUserById(id: string): Observable<any> {
    return this.http
      .get<any>(AppConstants.API_URL+"users/"+id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
