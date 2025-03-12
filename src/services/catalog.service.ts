import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from '../models/product';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  apiBaseUrl = `${environment.apiUrl}/catalog/api`;

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get<ProductDto[]>(`${this.apiBaseUrl}/products`);
  }

  getProduct(productId: string) {
    return this.httpClient.get<ProductDto>(`${this.apiBaseUrl}/products/${productId}`);
  }
}
