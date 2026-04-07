import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ProductList } from './product/product-list/product-list';

@NgModule({
  declarations: [App, ProductList],
  imports: [BrowserModule, AppRoutingModule, NgxBootstrapIconsModule.pick(allIcons)],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
