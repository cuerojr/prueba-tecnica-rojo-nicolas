import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1ProductsListComponent } from './f1-products-list.component';

describe('F1ProductsListComponent', () => {
  let component: F1ProductsListComponent;
  let fixture: ComponentFixture<F1ProductsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F1ProductsListComponent]
    });
    fixture = TestBed.createComponent(F1ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
