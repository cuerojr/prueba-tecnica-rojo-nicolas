import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { F1ProductsListComponent } from './components/f1-products-list/f1-products-list.component';
import { F2SearchbarComponent } from './components/f2-searchbar/f2-searchbar.component';
import { F3RegisterQuantitySelectComponent } from './components/f3-register-quantity-select/f3-register-quantity-select.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { F4AddProductBtnComponent } from './components/f4-add-product-btn/f4-add-product-btn.component';
import { F4AddProductFormComponent } from './components/f4-add-product-form/f4-add-product-form.component';
import { KebabComponent } from './components/kebab/kebab.component';
import { F4ProductDetailComponent } from './components/f4-product-detail/f4-product-detail.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';

import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    F1ProductsListComponent,
    F2SearchbarComponent,
    F3RegisterQuantitySelectComponent,
    NavbarComponent,
    F4AddProductBtnComponent,
    F4AddProductFormComponent,
    KebabComponent,
    FilterPipe,
    F4ProductDetailComponent,
    ToolTipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
