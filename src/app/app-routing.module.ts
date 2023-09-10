import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductComponent },
  { path: 'users', component: UsersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }, // This line HAS TO BE at the end
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
