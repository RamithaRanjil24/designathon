import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './newproduct/newproduct.component';
import {ProductService} from './productservice.service';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { UpdateProductComponent } from './update-product/update-product.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NewProductComponent,
    LoginComponent,
    UpdateProductComponent,
    HomepageComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService,AuthGuard,ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
