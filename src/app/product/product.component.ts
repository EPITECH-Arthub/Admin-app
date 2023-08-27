import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RoleCheckService } from '../services/role-check.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  createProductForm: FormGroup;
  editProductForm: FormGroup;
  products: any[] = [];
  selectedFile: File | undefined;
  currentProduct: any = {};

  constructor(
    private route: ActivatedRoute, private tokenStorage: TokenStorageService,  public fb: FormBuilder, public productService: ProductService, 
    private authService: AuthService, public router: Router, private roleCheckService: RoleCheckService,
  ) {
    this.createProductForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      image_link: [''],
      type: ['']
     });
     this.editProductForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      image_link: [''],
      type: ['']
    });
  }
  
  ngOnInit(): void {
    if(!this.authService.isLoggedIn || !this.roleCheckService.isAdmin()){
      this.router.navigate(['login']);
    }
    this.loadProducts();
  }
  
  loadProducts() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      }
    );
  }

  loadProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe((data: {}) => {
      this.currentProduct = data;
    });
  }

  editProduct(): void {
    this.productService.editProduct(this.editProductForm.value).subscribe({
      next: (res: any) => {
        if (res) {
          window.location.reload()
          this.productService.showAlert('Annonce modifiée.', 'success')
        }
      },
      error: (err: any) => {
        this.productService.showAlert('Impossible de modifier le produit. Vérifiez vos informations !', 'danger')
      }
    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: (res: any) => {
          window.location.reload()
          this.productService.showAlert('Annonce supprimée.', 'success')
      },
    });
  }

  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  createProduct(): void {
    if(this.selectedFile){
      this.createProductForm.value.image_link = this.selectedFile.name;
    }
    this.productService.createProduct(this.createProductForm.value).subscribe({
      next: (res: any) => {
        if (res) {
          window.location.reload()
          this.productService.showAlert('Produit crée.', 'success')
        }
      },
      error: (err: any) => {
        this.productService.showAlert('Impossible de créer le produit. Vérifiez vos informations !', 'danger')
      }
    });
  }

  getImageUrl(imageLink: string): string {
    return `assets/img/${imageLink}`;
  }

}
