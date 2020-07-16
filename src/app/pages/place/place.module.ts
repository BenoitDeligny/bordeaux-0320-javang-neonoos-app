import { MapboxComponent } from './../../shared/components/mapbox/mapbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';

// Material
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';

import { PlaceRoutingModule } from './place-routing.module';
import { PlaceViewComponent } from './place-view/place-view.component';
import { PlaceResultsComponent } from './place-view/components/place-results/place-results.component';
import { PlaceFilterComponent } from './place-view/components/place-filter/place-filter.component';
import { StarsboxComponent } from '../../shared/components/starsbox/starsbox.component';

import { PlaceEditViewComponent } from './place-edit-view/place-edit-view.component';
import { PlaceEditComponent } from './place-edit-view/components/place-edit/place-edit.component';
import { PlaceDescriptionComponent } from './place-edit-view/components/place-description/place-description.component';
import { PlacePictureComponent } from './place-edit-view/components/place-picture/place-picture.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { AddPictureDialogComponent } from './place-edit-view/components/add-picture-dialog/add-picture-dialog.component';


@NgModule({
  declarations: [
    PlaceViewComponent,
    PlaceResultsComponent,
    PlaceFilterComponent,
    PlaceEditViewComponent,
    PlaceEditComponent,
    PlaceDescriptionComponent,
    PlacePictureComponent,
    AddPictureDialogComponent
  ],
  imports: [
    CommonModule,
    PlaceRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    SharedModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSliderModule,
    MatDividerModule,
    MatTabsModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    QuillModule,
    MatRadioModule,
    MatDialogModule,
  ]
})
export class PlaceModule { }
