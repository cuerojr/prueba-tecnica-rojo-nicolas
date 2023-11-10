import { ComponentFixture, TestBed } from '@angular/core/testing';
import { F1ProductsListComponent } from './f1-products-list.component';
import { ProductsService } from 'src/app/services/service.service';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/interfaces/interfaces';
import { F4AddProductBtnComponent } from '../f4-add-product-btn/f4-add-product-btn.component';
import { ToolTipComponent } from '../tool-tip/tool-tip.component';

describe('F1ProductsListComponent', () => {
  let component: F1ProductsListComponent;
  let fixture: ComponentFixture<F1ProductsListComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    // Create a spy object for the ProductsService
    const spyProductsService = jasmine.createSpyObj('ProductsService', ['getProducts']);

    TestBed.configureTestingModule({
      declarations: [F1ProductsListComponent, F4AddProductBtnComponent, ToolTipComponent], // Add the component here
      providers: [
        { provide: ProductsService, useValue: spyProductsService },
      ],
    }).compileComponents();

    // Retrieve the injected instances
    fixture = TestBed.createComponent(F1ProductsListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on ngOnInit', () => {
    const mockProducts: any = [{
      id: "trj-mnd-1",
      name: "Visa Mileage2",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    },
    {
      id: "trj-mnd-2",
      name: "Visa Mileage2",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    }];

    // Set up the spy to return a mock observable when getProducts is called
    productsService.getProducts.and.returnValue(of(mockProducts));

    // Call ngOnInit to trigger the data loading
    component.ngOnInit();

    // Expect the allProducts and filteredData to be populated
    expect(component.allProducts).toEqual(mockProducts);
    expect(component.filteredData).toEqual(mockProducts);
  });

  it('should apply filter correctly', () => {
    const mockProducts: Product[] = [
      {
        id: "trj-mnd-1",
        name: "Visa Mileage2",
        description: "acumula millas y viaja por el mundo2",
        logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
        date_release: new Date("2023-06-07T00:00:00.000+00:00"),
        date_revision: new Date("2024-06-07T00:00:00.000+00:00")
      },
      {
        id: "trj-mnd-2",
        name: "Visa Mileage2",
        description: "acumula millas y viaja por el mundo2",
        logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
        date_release: new Date("2023-06-07T00:00:00.000+00:00"),
        date_revision: new Date("2024-06-07T00:00:00.000+00:00")
      },
      {
        id: "trj-mnd-3",
        name: "Visa Mileage3",
        description: "acumula millas y viaja por el mundo2",
        logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
        date_release: new Date("2023-06-07T00:00:00.000+00:00"),
        date_revision: new Date("2024-06-07T00:00:00.000+00:00")
      }];

    // Set up the allProducts array
    component.allProducts = mockProducts;

    // Call applyFilter with a search term
    component.searchTerm = 'Visa Mileage2';
    component.applyFilter();

    // Expect filteredData to contain only the products with names containing 'Product'
    expect(component.filteredData).toEqual([
      {
        id: "trj-mnd-1",
        name: "Visa Mileage2",
        description: "acumula millas y viaja por el mundo2",
        logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
        date_release: new Date("2023-06-07T00:00:00.000+00:00"),
        date_revision: new Date("2024-06-07T00:00:00.000+00:00")
    },
    {
      id: "trj-mnd-2",
      name: "Visa Mileage2",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: new Date("2023-06-07T00:00:00.000+00:00"),
      date_revision: new Date("2024-06-07T00:00:00.000+00:00")
    }]);
  });

  it('should handle filtering with special characters', () => {
    // Set up the allProducts array
    const mockProducts: Product[] = [{
      id: "trj-mnd-1",
      name: "@#$",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    },
    {
      id: "trj-mnd-2",
      name: "@#$",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    },
    {
      id: "trj-mnd-3",
      name: "@#% 1212",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    }];

    component.allProducts = mockProducts;

    // Call applyFilter with a search term containing special characters
    component.searchTerm = '@#$';
    component.applyFilter();

    // Expect filteredData to be empty or to contain specific products based on your implementation
    expect(component.filteredData).toEqual([{
      id: "trj-mnd-1",
      name: "@#$",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    },
    {
      id: "trj-mnd-2",
      name: "@#$",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    }]);
  });

  it('should handle filtering with an empty string', () => {
    // Set up the allProducts array
    const mockProducts: Product[] = [{
      id: "trj-mnd-1",
      name: "",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    },
    {
      id: "trj-mnd-2",
      name: "Visa Mileage2",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    }];

    component.allProducts = mockProducts;

    // Call applyFilter with an empty search term
    component.searchTerm = '';
    component.applyFilter();

    // Expect filteredData to be the same as allProducts
    expect(component.filteredData).toEqual(mockProducts);
  });

  it('should handle empty result set after filtering', () => {
    // Set up the allProducts array
    const mockProducts: Product[] = [{
      id: "trj-mnd-1",
      name: "",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    },
    {
      id: "trj-mnd-2",
      name: "Visa Mileage2",
      description: "acumula millas y viaja por el mundo2",
      logo: "https://www.copaair.com/assets/Banco-General-Signature.png",
      date_release: "2023-06-07T00:00:00.000+00:00",
      date_revision: "2024-06-07T00:00:00.000+00:00"
    }];

    component.allProducts = mockProducts;

    // Call applyFilter with a search term that doesn't match any products
    component.searchTerm = 'Non-Existent Product';
    component.applyFilter();

    // Expect filteredData to be an empty array
    expect(component.filteredData).toEqual([]);
  });

});
