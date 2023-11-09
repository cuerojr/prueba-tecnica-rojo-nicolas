import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: String = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/';
  private authorId: String = '1';
  protected productList: Product[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/ipf-msa-productosfinancieros/bp/products`, {
      headers: {
        'content-type': 'application/json',
        'authorId': `${this.authorId}`
      }
    });
  }

  createProduct(id: String, name: String, description: String, logo: String, date_release: String, date_revision: String) {
    if(!id ||
      !name ||
      !description ||
      !logo ||
      !date_release ||
      !date_revision) {
        return;
    }
    this.http.post(`${this.baseUrl}/ipf-msa-productosfinancieros/bp/products`, {
      id,
      name,
      description,
      logo,
      date_release,
      date_revision
    }, {
      headers: {
        'authorId': `${this.authorId}`
      }
    }).subscribe((res) => {
      console.log(res)
      if(res) {
        this.router.navigate(['/']);
      }
    });
  }


}
