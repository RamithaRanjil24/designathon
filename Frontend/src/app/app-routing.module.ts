import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './products/products.component'
import { NewProductComponent } from './newproduct/newproduct.component';
import {LoginComponent} from './login/login.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path:'add', 
  canActivate: [AuthGuard],
  component: NewProductComponent,
},
{
  path:'update',
  component:UpdateProductComponent
},
{
  path:'homepage',
  component:HomepageComponent
},
{
  path:'contact',
  component:ContactComponent
}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
