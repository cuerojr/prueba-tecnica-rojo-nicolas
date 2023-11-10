import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces';
import { ProductsService } from 'src/app/services/service.service';

@Component({
  selector: 'app-f1-products-list',
  templateUrl: './f1-products-list.component.html',
  styleUrls: ['./f1-products-list.component.css']
})
export class F1ProductsListComponent implements OnInit {
  allProducts: Product[] = [];
  filteredData: Product[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  Math = Math;
  showOptions = false;
  selectedItem: String | null = null;
  itemToDeleteId: string | null = null;
  isModalVisible = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productsService.getProducts().subscribe((response) => {
      this.allProducts = response;
      this.applyFilter();
    });
  }

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return Math.min(this.startIndex() + this.itemsPerPage - 1, this.filteredData.length - 1);
  }

  applyFilter() {
    this.filteredData = this.allProducts.filter(
      (item) => item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleOptions(itemId: String): void {
    this.selectedItem = this.selectedItem === itemId ? null : itemId;
  }

  onDeleteClick(itemId: string): void {
    this.productsService.deleteProduct(itemId).subscribe(
      (response: string) => {
        // Remove the item from the local array
        console.log('Item deleted successfully. Server response:', response);
      },
      (error: any) => {
        this.filteredData = this.filteredData.filter((item: Product) => item.id !== itemId);
      },
      () => {

      }
    );
  }

  @HostListener('document:click')
  closeOptions(): void {
    this.showOptions = false;
  }

  showDeleteConfirmationModal(itemId: string) {
    this.itemToDeleteId = itemId;
    this.isModalVisible = true;
  }

  onModalConfirmed(isConfirmed: boolean) {
    if (isConfirmed && this.itemToDeleteId) {
      this.onDeleteClick(this.itemToDeleteId);
    }

    this.itemToDeleteId = null;
    this.isModalVisible = false;
  }

}
