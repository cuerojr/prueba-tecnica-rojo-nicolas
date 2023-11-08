import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F3RegisterQuantitySelectComponent } from './f3-register-quantity-select.component';

describe('F3RegisterQuantitySelectComponent', () => {
  let component: F3RegisterQuantitySelectComponent;
  let fixture: ComponentFixture<F3RegisterQuantitySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F3RegisterQuantitySelectComponent]
    });
    fixture = TestBed.createComponent(F3RegisterQuantitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
