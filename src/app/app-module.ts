import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ProductList } from './product/product-list/product-list';
import { Star } from './product/product-list/star/star';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, NgxBootstrapIconsModule.pick(allIcons), App, ProductList, Star],
  providers: [provideBrowserGlobalErrorListeners()],
})
export class AppModule {}
