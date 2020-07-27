import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  private user: Observable<User>;
  private refreshTokenTimeout;


  constructor(private httpClient: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User{
    return this.userSubject.value;
  }
public  setValue(user){
  this.userSubject.next(user);
}

  loginUser(formData): Observable<User>{
    const header = new HttpHeaders();
    header.set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<User>('https://api2.neonoos.com/api/login',
      formData).pipe(tap(
        response => {
          localStorage.setItem('userInfo', JSON.stringify(response));
          this.userSubject.next(response);
        }
      ));
  }
  logout() {
    this.httpClient.post<any>(`${environment.APIURI}logout`, {}).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
}

refreshToken() {
  const token = this.userValue.refresh_token;
  const formdata = new FormData();
  formdata.append('refresh_token', token);

  return this.httpClient.post<any>(`${environment.APIURI}refresh`, formdata )
      .pipe(map((user) => {
          this.userSubject.next(user);
          localStorage.setItem('userInfo', JSON.stringify(user));
          this.stopRefreshTokenTimer();
          this.startRefreshTokenTimer();
          return user;
      }));
}

    private startRefreshTokenTimer() {
        const timeout = this.userValue.expires_in;
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), (timeout * 1000) - 60000);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
