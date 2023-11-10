import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/services/service.service';
import { minDateValidator } from 'src/app/utils/minDateValidator';

@Component({
  selector: 'app-f4-product-detail',
  templateUrl: './f4-product-detail.component.html',
  styleUrls: ['./f4-product-detail.component.css']
})

export class F4ProductDetailComponent implements OnInit  {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);
  productId = 0;
  minDate: string;
  minDateRevision: string;

  applyForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl('', [Validators.required, minDateValidator()]),
    date_revision: new FormControl('', [Validators.required, minDateValidator()])
  })


  constructor(private router: Router) {
    this.productId = this.route.snapshot.params['id'];
    this.minDate = new Date().toISOString().split('T')[0];
    this.minDateRevision = this.minDate;
  }

  ngOnInit() {
    this.subscribeToDateReleaseChanges();
  }

  resetForm() {
    this.applyForm.reset();
  }

  submitApplication() {
    if(this.applyForm.invalid) {
      return;
    }

    this.productService.checkIdAvailability(this.applyForm.value.id as string).subscribe(
      (repeatedId: boolean) => {
        if (!repeatedId) {
          // The ID is available, proceed with creating the product
          this.productService.createProduct(
            this.applyForm.value.id as string,
            this.applyForm.value.name as string,
            this.applyForm.value.description as string,
            this.applyForm.value.logo as string,
            this.applyForm.value.date_release as string,
            this.applyForm.value.date_revision as string
          ).subscribe({
            next: (data) => {
              return data;
            },
            error: (error) => {
              console.log(error)
            },
            complete: () => {
              this.router.navigate(['/']);
            }
          });
        } else {
          console.error('ID is used');
        }
      },
      (error: any) => {
        console.error('Error checking ID availability:', error);
      }
    );


  }

  private subscribeToDateReleaseChanges() {
    const dateReleaseControl = this.applyForm.get('date_release');

    if (dateReleaseControl) {
      dateReleaseControl.valueChanges.subscribe((newDateRelease: string | null) => {
        if (newDateRelease !== null) {
          this.updateMinDateRevision(newDateRelease);
        }
      });
    }
  }

  public updateMinDateRevision(event: any) {
    const newDateRelease = event?.target?.value;

    if (newDateRelease !== null && newDateRelease !== undefined) {
      const selectedDateRelease = new Date(newDateRelease);
      const minDateRevision = new Date(selectedDateRelease);
      minDateRevision.setFullYear(minDateRevision.getFullYear() + 1);
      this.minDateRevision = minDateRevision.toISOString().split('T')[0];

      const dateRevisionControl = this.applyForm.get('date_revision');
      if (dateRevisionControl) {
        dateRevisionControl.setValue(this.minDateRevision);
      }
    }
  }
}
