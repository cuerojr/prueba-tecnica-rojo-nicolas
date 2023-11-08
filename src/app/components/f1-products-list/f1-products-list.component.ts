import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces';
import { ProductsService } from 'src/app/services/service.service';

@Component({
  selector: 'app-f1-products-list',
  templateUrl: './f1-products-list.component.html',
  styleUrls: ['./f1-products-list.component.css']
})
export class F1ProductsListComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  _filterText: string = '';

  get filterText() {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.filteredProducts = this.filterProducts(value);
  }

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAPI();
  }

  getAPI() {
    this.productsService.getProducts().subscribe((data) => {
      this.allProducts = data;
      console.log(data)
    });
  }

  filterProducts(filterTerm: string) {
    if(this.allProducts.length === 0 || this.filterText === ''){
      return this.allProducts;
    } else {
      return this.allProducts.filter((product) => {
        return product.name.toLowerCase() === filterTerm.toLowerCase();
      })
    }
  }
}
