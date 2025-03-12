import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { CatalogService } from '../../../services/catalog.service';
import { MatButtonModule } from '@angular/material/button';
import { Customer, Item, Order } from '../../../models/order';
import { ProductDto } from '../../../models/product';
import { OrderService } from '../../../services/order.service';
import { OrderResponseDto } from '../../../models/order-response';
import { TrackingService } from '../../../services/tracking.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule
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
  public product: ProductDto = null!;

  public orderId = '';

  public disabled: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private catalogService: CatalogService, 
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private trackingService: TrackingService,
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

    this.getProduct();
  }

  public getProduct() {
    this.loading = true;
    this.catalogService.getProduct(this.productId).subscribe(
      {
        next: (product) => {
          this.product = product;
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
      console.error('Invalid form');
      return;
    }

    this.order = new Order();
    
    this.order.customer = {
      name: this.form.get('name')!.value,
      email: this.form.get('email')!.value
    } as Customer;

    this.order.items = [{
      productId: this.productId,
      quantity: 1
    }] as Item[];

    this.disabled = true;
    this.orderService.createOrder(this.order).subscribe(
      {
        next: (response: OrderResponseDto) => {
          this.router.navigate([`/order/${response.id}`]);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.disabled = false;
        }
      }
    );
  }
}
