import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SearchbarComponent } from './f2-searchbar.component';

describe('F2SearchbarComponent', () => {
  let component: F2SearchbarComponent;
  let fixture: ComponentFixture<F2SearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SearchbarComponent]
    });
    fixture = TestBed.createComponent(F2SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
