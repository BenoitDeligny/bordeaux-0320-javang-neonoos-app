import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

// Material
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
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideFilterComponent } from './guide-view/components/guide-filter/guide-filter.component';
import { GuideResultsComponent } from './guide-view/components/guide-results/guide-results.component';
import { GuideViewComponent } from './guide-view/guide-view.component';
import { GuideEditViewComponent } from './guide-edit-view/guide-edit-view.component';
import { GuideEditComponent } from './guide-edit-view/components/guide-edit/guide-edit.component';
import { GuideTravelComponent } from './guide-edit-view/components/guide-travel/guide-travel.component';
import { GuidePoiComponent } from './guide-edit-view/components/guide-poi/guide-poi.component';
import { GuidePoiSearchSectionComponent } from './guide-edit-view/components/guide-poi-search-section/guide-poi-search-section.component';



@NgModule({
  declarations: [
    GuideFilterComponent,
    GuideResultsComponent,
    GuideViewComponent,
    GuideEditViewComponent,
    GuideEditComponent,
    GuideTravelComponent,
    GuidePoiComponent,
    GuidePoiSearchSectionComponent
  ],
  imports: [
    CommonModule,
    GuideRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule

  ]
})
export class GuideModule { }
