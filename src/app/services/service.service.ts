import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl: String =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/';
  private authorId: String = '2';
  private cachedData: Product[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getProducts(): Observable<Product[]> {
    if (this.cachedData.length > 0) {
      return of(this.cachedData);
    }

    return this.http
      .get<Product[]>(
        `${this.baseUrl}/ipf-msa-productosfinancieros/bp/products`,
        {
          headers: {
            'content-type': 'application/json',
            authorId: `${this.authorId}`,
          },
        }
      )
      .pipe(
        tap((data) => (this.cachedData = data)), // Cache the data
        catchError(this.handleError<any[]>('getData', []))
      );
  }

  createProduct(
    id: String,
    name: String,
    description: String,
    logo: String,
    date_release: String,
    date_revision: String
  ): any {
    if (!id || !name || !description || !logo || !date_release || !date_revision) {
      return;
    }

    this.http
      .post(
        `${this.baseUrl}/ipf-msa-productosfinancieros/bp/products`,
        {
          id,
          name,
          description,
          logo,
          date_release,
          date_revision,
        },
        {
          headers: {
            'authorId': `${this.authorId}`,
          },
        }
      )
      .subscribe(
        (res) => {
          if (res) {
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.handleError('createProduct', error);

        }
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error
      return of(result as T);
    };
  }
}
