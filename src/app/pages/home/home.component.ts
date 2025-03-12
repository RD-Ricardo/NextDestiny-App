import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CatalogService } from '../../../services/catalog.service';
import { ProductDto } from '../../../models/product';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {


  public products: ProductDto[] = [];
  public loading: boolean = false;

  constructor(
    private router: Router,
    private catalogService: CatalogService
  ){}

  ngOnInit() {
    this.getProducts();
  }

  public checkout(productId: string) {
    this.router.navigate([`/checkout/${productId}`]);
  }

  public getProducts() {
    this.loading = true;
    this.catalogService.getProducts().subscribe(
      {
        next: (products) => {
          this.products = products;
        },
        error: (error) => {
          console.error('Error getting products: ', error);
        },
        complete: () => {
          this.loading = false
        }
      }
    );
  }
}
