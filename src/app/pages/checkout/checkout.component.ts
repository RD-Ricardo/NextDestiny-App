import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { CatalogService } from '../../../services/catalog.service';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  standalone: true
})
export class CheckoutComponent {
  public productId: string = '';
  public loading: boolean = false;
  public form: FormGroup = null!;
  public order: Order = null!;
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private catalogService: CatalogService, 
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['productId'] ?? null;

    if (this.productId == null) {
      this.router.navigate(['/']);
      return;
    }

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // this.getProduct();
  }

  public getProduct() {
    this.loading = true;
    this.catalogService.getProduct(this.productId).subscribe(
      {
        next: (product) => {
          console.log(product);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loading = false;
        }
      }
    );
  }

  public checkout() {
    if (this.form.invalid) {
      return;
    }

    this.order.customer = {
      name: this.form.value.name,
      email: this.form.value.email
    };

    this.order.items = [{
      productId: this.productId,
      quantity: 1
    }];
  }
}
