import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4AddProductFormComponent } from './f4-add-product-form.component';

describe('F4AddProductFormComponent', () => {
  let component: F4AddProductFormComponent;
  let fixture: ComponentFixture<F4AddProductFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4AddProductFormComponent]
    });
    fixture = TestBed.createComponent(F4AddProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
