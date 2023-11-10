import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { F4ProductDetailComponent } from './f4-product-detail.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/service.service';
import { of, throwError } from 'rxjs';

describe('F4ProductDetailComponent', () => {
  let component: F4ProductDetailComponent;
  let fixture: ComponentFixture<F4ProductDetailComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['createProduct']);
    const routeStub = { snapshot: { params: { id: '1' }, paramMap: convertToParamMap({ id: '1' }) } };

    TestBed.configureTestingModule({
      declarations: [F4ProductDetailComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProductsService, useValue: productsServiceSpy },
      ],
    }).compileComponents();

    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(F4ProductDetailComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form', () => {
    // Arrange
    component.applyForm.setValue({
      id: 'mock-id',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    });

    // Act
    component.resetForm();

    // Assert
    expect(component.applyForm.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    });
  });

  it('should submit application successfully', () => {
    // Arrange
    const navigateSpy = spyOn(router, 'navigate');
    productsService.createProduct.and.returnValue(of({}));

    // Act
    component.applyForm.setValue({
      id: 'mock-id',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    });

    component.submitApplication();

    // Assert
    expect(productsService.createProduct).toHaveBeenCalledWith(
      'mock-id',
      'mock-name',
      'mock-description',
      'mock-logo',
      '2023-01-01',
      '2024-01-01'
    );

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error during application submission', () => {
    // Arrange
    const consoleSpy = spyOn(console, 'log');
    productsService.createProduct.and.returnValue(throwError('Mock error'));

    // Act
    component.applyForm.setValue({
      id: 'mock-id',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    });

    component.submitApplication();

    // Assert
    expect(productsService.createProduct).toHaveBeenCalledWith(
      'mock-id',
      'mock-name',
      'mock-description',
      'mock-logo',
      '2023-01-01',
      '2024-01-01'
    );

    expect(consoleSpy).toHaveBeenCalledWith('Mock error');
  });

  it('should not submit application when the form is invalid', () => {
    // Arrange
    const navigateSpy = spyOn(router, 'navigate');
    // Configure the createProduct spy to return an observable
    productsService.createProduct.and.returnValue(of({}));

    // Act
    component.applyForm.setValue({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    });

    component.submitApplication();

    // Assert
    expect(component.applyForm.valid).toBeFalsy();
    expect(productsService.createProduct).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });



  it('should initialize the form correctly', () => {
    // Arrange
    component.applyForm.setValue({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    });

    // Assert
    expect(component.applyForm.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    });
  });

});
