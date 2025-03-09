import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  apiBaseUrl = 'http://localhost:3000/api/v1';

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get<ProductDto[]>(`${this.apiBaseUrl}/products`);
  }

  getProduct(productId: string) {
    return this.httpClient.get<ProductDto>(`${this.apiBaseUrl}/products/${productId}`);
  }
}
