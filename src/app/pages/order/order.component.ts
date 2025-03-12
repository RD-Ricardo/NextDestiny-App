import { Component } from '@angular/core';
import { TrackingService } from '../../../services/tracking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-order',
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  public orderId: string = '';
  public messages: string[] = [];
  currentStep = 0;
  errorMessage: string | null = null;

  public loading: boolean = false;

  constructor(
    private trackingService: TrackingService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['orderId'] ?? null;

    if (this.orderId == null) {
      this.router.navigate(['/']);
      return;
    }

    this.trackingService.startConnection();
    this.trackingService.onPaymentUpdate((orderId, message) => {
      console.log(`Order ${orderId} updated: ${message}`);
      this.messages.push(message);
      this.updateStep(message);
    });
  }

  retry(){
    this.messages = [];
    this.orderService.retryOrder(this.orderId).subscribe(() => {

    });
  }

  updateStep(message: string): void {
    if (message.includes('Pedido enviado')) {
      this.currentStep = 0;
      this.errorMessage = null;
    } else if (message.includes('Reserva de voo bem-sucedida')) {
      this.currentStep = 1;
      this.errorMessage = null;
    } else if (message.includes('Reserva de hotel bem-sucedida')) {
      this.currentStep = 2;
      this.errorMessage = null;
    } else if (message.includes('Pagamento processado com sucesso')) {
      this.currentStep = 3;
      this.errorMessage = null;
    } else if (message.includes('Falha na reserva do hotel')) {
      this.errorMessage = 'Falha na reserva do hotel';
      this.currentStep = 1;
    } else if (message.includes('Reserva de voo cancelada')) {
      this.errorMessage = `${message}`;
      this.currentStep = 0;
    }

    if (this.errorMessage != null || message.includes("Pagamento processado com sucesso")) {
      this.loading = true;
    }
  }
}
