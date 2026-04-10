import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { App } from './app/app';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

bootstrapApplication(App, {
  providers: [provideBrowserGlobalErrorListeners(), importProvidersFrom(NgxBootstrapIconsModule.pick(allIcons))],
})
  .catch(err => console.error(err));
