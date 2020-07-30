
import { Observable } from 'rxjs';
import { GuideService } from 'src/app/pages/guide/services/guide/guide.service';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output, OnChanges } from '@angular/core';

import { RootObject } from 'src/app/shared/models/root-object.model';
import { Guide } from '../../../models/guide';
import { Place } from 'src/app/shared/models/place.model';
import { Country } from 'src/app/shared/models/country';



@Component({
  selector: 'neo-guide-poi',
  templateUrl: './guide-poi.component.html',
  styleUrls: ['./guide-poi.component.scss']
})
export class GuidePoiComponent implements OnInit, OnChanges {
  @Input() countries: RootObjectList<Country>;
  @Input() guide: RootObject<Guide>;
  @Input() places: RootObjectList<Place>;
  @Input() PicturesUrl$: Observable<string>[] = [];
  @Input() placeResults: RootObjectList<Place>;
  @Input() picturePlaceResults$: Observable<string>[] = [];
  @Output() deletePlacesGuide = new EventEmitter();
  @Output() RefreshPlace = new EventEmitter();
  @Output() addPlace = new EventEmitter();

  constructor(private guideService: GuideService) {
  }
  ngOnInit() {
  }

  DeletePlacesGuide(place) {
    this.deletePlacesGuide.emit(place);
  }
  refreshPlaces(event) {
    this.RefreshPlace.emit(event);
  }
  sendPlaceToAdd(event) {
    this.addPlace.emit(event);
  }

  ngOnChanges() {

  }
}
