import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ERROR_LEVEL } from './core/services/logger';
import { environment } from '../environments/environment';

registerLocaleData(localeES, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    {
      provide: ERROR_LEVEL,
      useValue: environment.logLevel
    }

  ],
};
