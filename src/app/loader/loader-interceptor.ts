import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Loader } from '../services/loader';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderServices = inject(Loader);
  loaderServices.show();
  return next(req).pipe(finalize(() => loaderServices.hide()));
};
