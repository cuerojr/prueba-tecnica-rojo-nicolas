import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F1ProductsListComponent } from './components/f1-products-list/f1-products-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: F1ProductsListComponent
  },
  {
    path: '',
    component: NavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
