import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { Router, ActivatedRoute } from '@angular/router';

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



  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      if (this.authService.userValue) {
        this.router.navigate(['/guide']);
    }
     }

  ngOnInit(): void {

  }



  /* submit du formulaire */
  OnSubmit(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    if (email && password) {
      this.authService.loginUser(formData).subscribe(
        () => {
          this.router.navigate(['/guide']);
        }, () => {
          alert('Bad Login / Password');
        }
      );
    }
  }

}
