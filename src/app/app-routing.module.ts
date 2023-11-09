import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F1ProductsListComponent } from './components/f1-products-list/f1-products-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { F4ProductDetailComponent } from './components/f4-product-detail/f4-product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: F1ProductsListComponent
  },
  {
    path: '',
    component: NavbarComponent
  },
  {
    path: 'product-detail/:id',
    component: F4ProductDetailComponent
  },
  {
    path: 'product-detail',
    component: F4ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
