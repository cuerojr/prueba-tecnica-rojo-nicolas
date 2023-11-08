import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { F1ProductsListComponent } from './components/f1-products-list/f1-products-list.component';
import { F2SearchbarComponent } from './components/f2-searchbar/f2-searchbar.component';
import { F3RegisterQuantitySelectComponent } from './components/f3-register-quantity-select/f3-register-quantity-select.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { F4AddProductBtnComponent } from './components/f4-add-product-btn/f4-add-product-btn.component';
import { F4AddProductFormComponent } from './components/f4-add-product-form/f4-add-product-form.component';
import { KebabComponent } from './components/kebab/kebab.component';

@NgModule({
  declarations: [
    AppComponent,
    F1ProductsListComponent,
    F2SearchbarComponent,
    F3RegisterQuantitySelectComponent,
    NavbarComponent,
    F4AddProductBtnComponent,
    F4AddProductFormComponent,
    KebabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
