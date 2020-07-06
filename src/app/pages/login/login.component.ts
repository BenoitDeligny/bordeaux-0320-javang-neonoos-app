import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'neo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: RootObject<User>;


  /* Formulaire */
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();



  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /* submit du formulaire */
  OnSubmit(email: string, password: string) {
    if (email && password) {
      this.authService.loginUser(email, password).subscribe(
        () => {
          console.log('pouet');
          this.router.navigate(['/home']);
        }
      );
    }

    // store dans le local storage le token si il y est
  }

}
