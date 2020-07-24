import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JsonApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers;
    if (req.url !== 'https://api2.neonoos.com/api/login' && req.url !== 'https://api2.neonoos.com/api/refresh') {
      headers = new HttpHeaders({
        'Content-Type': 'application/vnd.api+json',
      });
      const modified = req.clone({
        headers
      });

      return next.handle(modified);
    }
    return next.handle(req);
  }
}
