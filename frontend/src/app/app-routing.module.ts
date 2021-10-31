import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import {ProductsComponent} from './components/products/products.component'

const routes: Routes = [
  {path: 'addproduct', component: AddproductComponent},
  {path: 'showproducts', component: ShowproductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
