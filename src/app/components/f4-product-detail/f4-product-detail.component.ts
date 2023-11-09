import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/service.service';

@Component({
  selector: 'app-f4-product-detail',
  templateUrl: './f4-product-detail.component.html',
  styleUrls: ['./f4-product-detail.component.css']
})

export class F4ProductDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);
  productId = 0;

  applyForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    date_release: new FormControl(''),
    date_revision: new FormControl('')
  })

  constructor() {
    //this.productId = Number(this.route.snapshot.params['id']);
    this.productId = this.route.snapshot.params['id'];
  }

  submitApplication() {
    this.productService.createProduct(
      this.applyForm.value.id ?? '',
      this.applyForm.value.name ?? '',
      this.applyForm.value.description ?? '',
      this.applyForm.value.logo ?? '',
      this.applyForm.value.date_release ?? '',
      this.applyForm.value.date_revision ?? ''
    );
  }

}
