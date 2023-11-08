import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/';

  constructor(private http: HttpClient) {   }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/ipf-msa-productosfinancieros/bp/products`,{
      headers: {
        'content-type': 'application/json',
        'authorId': '1'
      }
    })
  }
}
