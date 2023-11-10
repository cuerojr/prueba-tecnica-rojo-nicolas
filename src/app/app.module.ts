import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { F1ProductsListComponent } from './components/f1-products-list/f1-products-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { F4AddProductBtnComponent } from './components/f4-add-product-btn/f4-add-product-btn.component';
import { KebabComponent } from './components/kebab/kebab.component';
import { F4ProductDetailComponent } from './components/f4-product-detail/f4-product-detail.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';

import { FilterPipe } from './pipes/filter.pipe';
import { DeleteConfirmationModalComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    F1ProductsListComponent,
    NavbarComponent,
    F4AddProductBtnComponent,
    KebabComponent,
    FilterPipe,
    F4ProductDetailComponent,
    ToolTipComponent,
    DeleteConfirmationModalComponent
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
