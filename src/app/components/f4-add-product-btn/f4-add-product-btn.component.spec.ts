import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4AddProductBtnComponent } from './f4-add-product-btn.component';

describe('F4AddProductBtnComponent', () => {
  let component: F4AddProductBtnComponent;
  let fixture: ComponentFixture<F4AddProductBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4AddProductBtnComponent]
    });
    fixture = TestBed.createComponent(F4AddProductBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
