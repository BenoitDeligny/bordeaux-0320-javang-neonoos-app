import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxComponent } from './components/mapbox/mapbox.component';
import { StarsboxComponent } from './components/starsbox/starsbox.component';
import { MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    MapboxComponent,
    StarsboxComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    MapboxComponent,
    StarsboxComponent
  ]
})
export class SharedModule { }
