import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'guide',
    pathMatch: 'full'
  },
  {
    path: 'guide',
    // canActivate: [AuthGuard],
    loadChildren: () => import('../app/pages/guide/guide.module').then(
      m => m.GuideModule
    )
  },
  {
    path: 'place',
    // canActivate: [AuthGuard],
    loadChildren: () => import('../app/pages/place/place.module').then(
      m => m.PlaceModule
    )
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
