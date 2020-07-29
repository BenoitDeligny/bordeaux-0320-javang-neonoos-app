import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place/place.service';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { Place } from 'src/app/shared/models/place.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Country } from 'src/app/shared/models/country';
import { CountryService } from 'src/app/shared/services/country.service';
import { Picture } from 'src/app/shared/models/picture.model';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { Data } from 'src/app/shared/models/data.model';
import { Relationships } from 'src/app/shared/models/relationships.model';
import { PlaceData } from 'src/app/shared/models/place-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'neo-place-edit-view',
  templateUrl: './place-edit-view.component.html',
  styleUrls: ['./place-edit-view.component.scss']
})
export class PlaceEditViewComponent implements OnInit {

  subscription = new Subscription();
  place?: RootObject<Place>;
  placeId: number;
  countries?: RootObjectList<Country> = new RootObjectList<Country>(Country, 'countries');
  country?: RootObject<Country> = new RootObject<Country>(Country, 'countries');
  placeData?: RootObject<PlaceData> = new RootObject<PlaceData>(PlaceData, 'placedatas');

  placePictures: RootObjectList<Picture> = new RootObjectList<Picture>(Picture, 'pictures');

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.getRouteParam();
    this.getCountries();
  }

  getRouteParam() {
    const routerSubsription = this.route.paramMap.subscribe(params => {
      if (params && params.get('id')) {
        const routePlaceId = Number(params.get('id'));
        this.placeId = routePlaceId;
        this.getOnePlace(this.placeId);
      } else {
        this.place = new RootObject<Place>(Place, 'places');
      }
    });
    this.subscription.add(routerSubsription);
  }


  getOnePlace(id: number) {
    const getOnePlaceSubscription = this.placeService.getById(id).subscribe((place: RootObject<Place>) => {
      if (place) {
        this.place = place;
      } else {
        this.place = new RootObject<Place>(Place, 'places');
      }
    });
    this.subscription.add(getOnePlaceSubscription);
    this.getCountry(id);
    this.getPlaceData(id);
  }


  getCountries() {
    this.countryService.getCountries().subscribe(
      countries => {
        this.countries = countries;
      }
    );
  }

  getCountry(id: number) {
    this.placeService.getCountryByPlace(id).subscribe(
      country => {
        this.country = country;
      }
    );
  }

  getPlaceData(id: number) {
    this.placeService.getPlaceDataById(id).subscribe(placeData => {
      if (placeData) {
        this.placeData = placeData;
      }
    });
  }

  // Persistence

  patchPlace({place, countryId}) {
    this.place.data.relationships.country.data.id = countryId;
    this.placeService.patch(place, this.placeId).subscribe();
    this.snackBar.open(`"${this.place.data.attributes.name}" a bien été modifié`, '👍', {
      duration: 2000
    });
  }


  postPlace({place, countryId}) {
    place.data.relationships = {};
    place.data.relationships.country = {};
    place.data.relationships.country.data = {};
    place.data.relationships.country.data.type = 'country';
    place.data.relationships.country.data.id = countryId;
    this.placeService.post(place).subscribe();
    this.snackBar.open(`"${this.place.data.attributes.name}" a bien été ajouté`, '👍', {
      duration: 2000
    });
  }


}

