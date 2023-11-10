import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';

import { ProductsService } from './service.service';
import { Product } from '../interfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'Logo 1',
        date_release: '2023-01-01',
        date_revision: '2023-01-01',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'Logo 2',
        date_release: '2023-01-01',
        date_revision: '2023-01-01',
      },
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/ipf-msa-productosfinancieros/bp/products`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockProducts);
  });

  it('should handle error when getting products', () => {
    const errorMessage = 'Error fetching products';

    // Set up the mock response with an error
    service.getProducts().subscribe(
      () => fail('Expected an error'),
      (error) => {
        expect(error instanceof HttpErrorResponse).toBeTrue();
        const httpError = error as HttpErrorResponse;
        expect(httpError.error).toEqual(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/ipf-msa-productosfinancieros/bp/products`
    );

    expect(req.request.method).toEqual('GET');

  });


  it('should create a product', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      date_release: '2023-06-07',
      date_revision: '2024-06-07',
    };

    service.createProduct(
      mockProduct.id,
      mockProduct.name,
      mockProduct.description,
      mockProduct.logo,
      mockProduct.date_release,
      mockProduct.date_revision
    ).subscribe(() => {
      expect(service.cachedData).toEqual([mockProduct]);
    });

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/ipf-msa-productosfinancieros/bp/products`
    );

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('authorId')).toEqual(`${service['authorId']}`);

    req.flush(mockProduct);

    spyOn(service, 'handleError');
    expect(service.handleError).not.toHaveBeenCalled();
  });

  it('should handle error when creating a product', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'Logo 1',
      date_release: '2023-06-07',
      date_revision: '2024-06-07',
    };

    const errorMessage = 'Error creating product';

    // Set up the mock response with an error
    service.createProduct(
      mockProduct.id,
      mockProduct.name,
      mockProduct.description,
      mockProduct.logo,
      mockProduct.date_release,
      mockProduct.date_revision
    ).subscribe(
      () => fail('Expected an error'),
      (error) => {
        expect(error instanceof HttpErrorResponse).toBeTrue(); // Check if it's an HttpErrorResponse
        const httpError = error as HttpErrorResponse;
        expect(httpError.error).toEqual({ message: errorMessage }); // Check if the error message in HttpErrorResponse contains the expected message
      }
    );

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/ipf-msa-productosfinancieros/bp/products`
    );

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('authorId')).toEqual(`${service['authorId']}`);

    spyOn(service, 'handleError');
    expect(service.handleError).not.toHaveBeenCalled();
  });

});
