import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { Login } from './features/auth/components/login/login';
import { Number } from './features/numbers/components/number/number';
import { User } from './features/users/components/user/user';
import { ProductPagination } from './features/products/components/product-pagination/product-pagination';
import { Map } from './features/maps/components/map/map';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    Login,
    Number,
    User,
    ProductPagination,
    GoogleMapsModule,
    Map,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  declarations: [],
})
export class AppModule {}
