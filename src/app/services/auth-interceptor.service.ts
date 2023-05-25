import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationResponse } from 'app/models/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('accessToken')) {
    
        let token = localStorage.getItem('accessToken') as string;
        req = req.clone({
          headers: new HttpHeaders ({
            Authorization: 'Bearer '+token
          })
      })

   
    }

    return next.handle(req);


  }
}
