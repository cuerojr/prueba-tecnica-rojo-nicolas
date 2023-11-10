import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl('', Validators.required),
    date_release: new FormControl('', Validators.required),
    date_revision: new FormControl('', Validators.required)
  })

  constructor() {
    this.productId = this.route.snapshot.params['id'];
  }

  resetForm() {
    this.applyForm.reset();
  }

  submitApplication() {
    this.productService.createProduct(
      this.applyForm.value.id as string,
      this.applyForm.value.name as string,
      this.applyForm.value.description as string,
      this.applyForm.value.logo as string,
      this.applyForm.value.date_release as string,
      this.applyForm.value.date_revision as string
    );
  }

}
