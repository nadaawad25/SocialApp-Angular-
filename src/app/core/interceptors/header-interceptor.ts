import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  const _PLATFORM_ID= inject(PLATFORM_ID)
  
  if (isPlatformBrowser(_PLATFORM_ID)) {
    if(localStorage.getItem('socialToken') !== null){
      req.clone({
        setHeaders:{token : localStorage.getItem('socialToken') !}
      })
    }    
  }


  return next(req);
};
