import { AuthService } from '../pages/login/services/auth.service';
import { Router } from '@angular/router';


export function appInitializer(authenticationService: AuthService, route: Router) {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user) {
    authenticationService.setValue(user);
    return () => new Promise(resolve => {

        authenticationService.refreshToken()
            .subscribe()
            .add(resolve);
    });
  }
  route.navigateByUrl('/login');
  return () => new Promise (end => end());
}
