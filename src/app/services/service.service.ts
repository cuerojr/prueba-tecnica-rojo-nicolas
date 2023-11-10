import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl: String =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/';
  private authorId: String = '2';
  public cachedData: Product[] = [];

  constructor(private http: HttpClient) {}

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
  ): Observable<any> {
    if (
      !id ||
      !name ||
      !description ||
      !logo ||
      !date_release ||
      !date_revision
    ) {
      return throwError('Invalid input data') as Observable<any>;
    }

    return this.http
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
            authorId: `${this.authorId}`,
          },
        }
      )
      .pipe(
        map((res: any) => {
          return of(this.cachedData.push(res));
        }),
        catchError((error) => {
          this.handleError('createProduct', error);
          return throwError(error) as Observable<any>;
        })
      );
  }

  deleteProduct(id: string): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/ipf-msa-productosfinancieros/bp/products?id=${id}`,
      {
        headers: {
          authorId: `${this.authorId}`,
        },
      }
    );
  }

  checkIdAvailability(id: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/ipf-msa-productosfinancieros/bp/products/verification?id=${id}`,
      {
        headers: {
          authorId: `${this.authorId}`,
        },
      }
    ).pipe(
      catchError((error) => {
        // Handle errors, log, or propagate the error as needed
        this.handleError('checkIdAvailability', error);
        return throwError(error) as Observable<boolean>;
      })
    );
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error
      return of(result as T);
    };
  }
}
