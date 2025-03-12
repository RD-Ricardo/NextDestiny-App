import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDto } from '../models/product';
import { OrderResponseDto } from '../models/order-response';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiBaseUrl = `${environment.apiUrl}/order/api`;
  
  constructor(private httpClient: HttpClient) { }
  
  createOrder(order: Order): Observable<OrderResponseDto> {
    return this.httpClient.post<OrderResponseDto>(`${this.apiBaseUrl}/Order`, order);
  }

  retryOrder(orderId: string): Observable<any> {
    return this.httpClient.put(`${this.apiBaseUrl}/Order/${orderId}/retry`, {});
  }
}
