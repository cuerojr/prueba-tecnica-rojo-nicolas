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
  searchTerm: string = '';
  qtyTerm: number | undefined;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAPI();
  }

  getAPI() {
    this.productsService.getProducts().subscribe((data) => {
      this.allProducts = data;
    });
  }

  onDeleteClick(id: String) {}
}
