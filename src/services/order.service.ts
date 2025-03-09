import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiBaseUrl = 'http://localhost:3000/api/v1';
  
  constructor(private httpClient: HttpClient) { }
  
  getProducts() {
    return this.httpClient.get<ProductDto[]>(`${this.apiBaseUrl}/products`);
  }
}
