import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { RoleCheckService } from '../services/role-check.service';
import { TokenStorageService } from '../services/token-storage.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  
  orders: any[] = [];

  constructor(
    private route: ActivatedRoute, private tokenStorage: TokenStorageService,  public fb: FormBuilder, public productService: ProductService, 
    private authService: AuthService, public router: Router, private roleCheckService: RoleCheckService, private orderService: OrdersService
  ) {
  }
  
  ngOnInit(): void {
    if(!this.authService.isLoggedIn || !this.roleCheckService.isAdmin()){
      this.router.navigate(['login']);
    }
    this.loadProducts();
  }

  loadProducts() {
    this.orderService.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
      }
    );
  }
}
