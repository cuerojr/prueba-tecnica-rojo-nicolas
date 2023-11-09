import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4ProductDetailComponent } from './f4-product-detail.component';

describe('F4ProductDetailComponent', () => {
  let component: F4ProductDetailComponent;
  let fixture: ComponentFixture<F4ProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4ProductDetailComponent]
    });
    fixture = TestBed.createComponent(F4ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
