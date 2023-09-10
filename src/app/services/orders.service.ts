import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError } from 'rxjs';
import { AppConstants } from '../common/app.constants';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = AppConstants.API_BASE_URL + '/api/v1/orders';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Get all orders

  getOrders(): Observable<any[]> { 
    return this.http.get<any[]>(this.url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    return [];
  }
}
