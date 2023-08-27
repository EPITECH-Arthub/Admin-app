import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Get all products

  getProducts(): Observable<any[]> { 
    return this.http.get<any[]>(this.url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Create Product 

  createProduct(offer: any): Observable<any> {
    return this.http.post(this.url, offer).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return [];
  }

  getProductById(id: string): Observable<any> {
    let api = `${this.url}/${id}`;
    return this.http
      .get<any>(api)
      .pipe(retry(1), catchError(this.handleError));
  }

  // edit Product 

  editProduct(product: any): Observable<any> {
    return this.http.put(this.url, product).pipe(catchError(this.handleError));
  }

  // Delete Product

  deleteProduct(id: string): Observable<any> {
    let api = `${this.url}/${id}`;
    return this.http.delete(api).pipe(catchError(this.handleError));
  }

  showAlert(message: String, type: String) {
    let alertPlaceholder = document.getElementById('alert_message')
    if (alertPlaceholder) {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
      alertPlaceholder.append(wrapper)
    }
  }

}
