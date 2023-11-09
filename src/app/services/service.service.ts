import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/';

  protected productList: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/ipf-msa-productosfinancieros/bp/products`, {
      headers: {
        'content-type': 'application/json',
        'authorId': '1'
      }
    });
  }

  createProduct(id: String, name: String, description: String, logo: String, date_release: String, date_revision: String) {
    this.http.post(`${this.baseUrl}/ipf-msa-productosfinancieros/bp/products`, {
      id,
      name,
      description,
      logo,
      date_release,
      date_revision
    }, {
      headers: {
        'authorId': '1'
      }
    }).subscribe((res) => {
      console.log(res)
    });
  }


}
