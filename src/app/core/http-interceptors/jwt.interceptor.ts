import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/login/services/auth.service';
import { environment } from 'src/environments/environment';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && user.access_token;
        const isApiUrl = request.url.startsWith(environment.APIURI);
        if (isLoggedIn && isApiUrl) {
          request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.access_token}` }
            });
        }

        return next.handle(request);
    }
}
