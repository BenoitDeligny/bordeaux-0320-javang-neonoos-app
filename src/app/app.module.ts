import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';


// Material
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { JsonApiInterceptor } from './core/http-interceptors/jsonApi.interceptor';
import { ProgbarComponent } from './shared/components/progbar/progbar.component';
import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptor } from './core/http-interceptors/loader-interceptor.interceptor';
import { DialogSaveComponent } from './shared/components/dialog-save/dialog-save.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './core/http-interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/http-interceptors/httpError.interceptor';
import { AuthService } from './pages/login/services/auth.service';
import { appInitializer } from './core/app.initializer';
import { Router } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ProgbarComponent,
    DialogSaveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    QuillModule.forRoot(),
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    QuillModule.forRoot(),
    SharedModule,

  ],
  providers: [
    LoaderService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService, Router] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
