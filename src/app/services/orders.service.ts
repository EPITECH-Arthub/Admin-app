import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = 'http://localhost:8080/api/v1/orders';

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
