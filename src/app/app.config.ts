import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { createClient } from '@supabase/supabase-js';
import { loaderInterceptor } from './loader/loader-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
  ],
};
