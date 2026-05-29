import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(NgxBootstrapIconsModule.pick(allIcons)),
  ],
})
  .catch(err => console.error(err));
