import { ApplicationConfig, LOCALE_ID, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SocialLoginModule, SOCIAL_AUTH_CONFIG, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { provideHttpClient } from '@angular/common/http';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(NgxBootstrapIconsModule.pick(allIcons)),
    importProvidersFrom(SocialLoginModule),
    {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('285572739324-lahcbj142frnohf5b6i9g1mn2t8ts2o4.apps.googleusercontent.com')
          }
        ],
        onError: (err) => console.error('Error Auth:', err)
      } as SocialAuthServiceConfig
    }
  ]
};
