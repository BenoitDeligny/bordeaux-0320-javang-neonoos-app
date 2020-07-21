import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ElideInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ok = true;
    let headers;
    // const token = localStorage.getItem('token');

    if (ok) {
      headers = new HttpHeaders({
        'Content-Type': 'application/vnd.api+json',
        // 'Authorization': localStorage.getItem('token'),
        'Authorization': 'ef71e838f63d90c9dc950269908dbf5af91db8c0'
      });

    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/vnd.api+json'
      });
    }
    const modified = req.clone({
      headers
    });

    return next.handle(modified);
  }

}
