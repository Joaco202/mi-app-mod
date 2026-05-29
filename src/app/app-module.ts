import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { Login } from './features/auth/components/login/login';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, NgxBootstrapIconsModule.pick(allIcons), Login],
  providers: [provideBrowserGlobalErrorListeners()],
})
export class AppModule {}
