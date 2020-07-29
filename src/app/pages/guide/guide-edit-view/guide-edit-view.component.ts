import { Component, OnInit, Input } from '@angular/core';
import { GuideService } from '../services/guide/guide.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HashtagService } from '../services/hashtag/hashtag.service';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { Subscription, Observable } from 'rxjs';
import { Guide } from '../models/guide';
import { Hashtag } from 'src/app/shared/models/hashtag';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Place } from 'src/app/shared/models/place.model';
import { Country } from 'src/app/shared/models/country';
import { Trip } from 'src/app/shared/models/trip';
import { TripService } from '../services/trip/trip.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { Relationships } from 'src/app/shared/models/relationships.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaceService } from '../../place/services/place/place.service';

@Component({
  selector: 'neo-guide-edit-view',
  templateUrl: './guide-edit-view.component.html',
  styleUrls: ['./guide-edit-view.component.scss']
})
export class GuideEditViewComponent implements OnInit {

  subscription = new Subscription();
  guideId: number;
  guide?: RootObject<Guide>;
  PicturesUrl$: Observable<string>[] = [];
  countries?: RootObjectList<Country> = new RootObjectList<Country>(Country, 'countries');
  guideHashtags: RootObjectList<Hashtag> = new RootObjectList<Hashtag>(Hashtag, 'hastags');
  filteredHashtags: Observable<any[]>;
  places: RootObjectList<Place>;
  placeResults: RootObjectList<Place>;
  PicturesPlaceResults$: Observable<string>[] = [];
  trips: RootObjectList<Trip>;
  guideTrips: RootObjectList<Trip> = new RootObjectList<Trip>(Trip, 'trips');


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guideService: GuideService,
    private hashtagService: HashtagService,
    private tripService: TripService,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private placeService: PlaceService
  ) { }

  ngOnInit(): void {
    this.getRouteParam();
    this.getCountries();

  }

  getRouteParam() {
    const routerSubscription = this.route.paramMap.subscribe(params => {
      if (params && params.get('id')) {
        const routeGuideId = Number(params.get('id'));
        this.guideId = routeGuideId;
        this.getOneGuide(this.guideId);
      } else {
        this.guide = new RootObject<Guide>(Guide, 'guides');
        this.places = new RootObjectList<Place>(Place, 'places');
        this.places.data = [];
        this.guideTrips.data = [];

      }
    });
    this.subscription.add(routerSubscription);
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      countries => {
        this.countries = countries;
      }
    );
  }

  getOneGuide(id: number) {
    const getOneGuideSubscription = this.guideService.getById(id).subscribe((guide: RootObject<Guide>) => {
      if (guide) {
        this.guide = guide;
        this.getGuidePlaces();
        this.getTripsByGuide();
      } else {
        this.guide = new RootObject<Guide>(Guide, 'guides');
      }
    });
    this.subscription.add(getOneGuideSubscription);
  }

  getGuideHastags() {
    const getGuideHastagsSubscription = this.guideService.getHashtagsByGuide(this.guideId).subscribe((data: RootObjectList<Hashtag>) => {
      if (data) {
        this.guideHashtags = data;
      }
    });
    this.subscription.add(getGuideHastagsSubscription);
  }
  // Methodes for GuidePOI Component
  getGuidePlaces() {
    this.guideService.getPlacesByGuide(this.guideId).subscribe((places: RootObjectList<Place>) => {
      if (places) {
        this.places = places;
        // this.places.data.map((place) => this.PicturesUrl$.push(this.getGuidePicture(place.id)));
      } else {
        this.places = new RootObjectList<Place>(Place, 'places');
      }
    });
  }
  deletePlacesGuide(place) {
   const temp = this.places.data.filter((placeTofind) => place.id !== placeTofind.id);
   this.places = new RootObjectList<Place>(Place, 'places');
   this.places.data = temp;
   if (this.placeResults?.data.length > 0) {
    this.placeResults.data.find((placeToFind) => placeToFind.id === place.id).attributes.ischecked = false;
    }
   this.guide.data.relationships.places.data = [];
   this.places.data.map((placetoKeep) => this.guide.data.relationships.places.data.push(new Relationships('places', placetoKeep.id)));
   this.places.data.map((placetochange) => this.PicturesUrl$.push(this.getGuidePicture(placetochange.id)));

  }

  getGuidePicture(id: number): Observable<string> {
    return this.guideService.getPictureGuide(id).pipe(map((picture) => {
     return  picture.data[0]?.attributes.filename;
    }));
  }

  // Methodes for GuideTravel Component
  addOrRemoveTrips(trip) {

    if (!trip.attributes.isChecked) {
      this.guideTrips.data.push(trip);
      if (!this.guide.data.relationships){
        this.guide.data.relationships = {};
        this.guide.data.relationships.trips = {};
      }
      this.guide.data.relationships.trips.data = [];
      this.guideTrips.data.map((tripToAdd) => this.guide.data.relationships.trips.data.push(new Relationships('trips', tripToAdd.id)));
      trip.attributes.isChecked = true;
    } else {
      const index = this.guideTrips.data.findIndex(
        (value) => trip.id === value.id
      );
      this.guideTrips.data.splice(index, 1);
      trip.attributes.isChecked = false;
      if (!this.guide.data.relationships){
        this.guide.data.relationships = {};
        this.guide.data.relationships.trips = {};
      }
      this.guide.data.relationships.trips.data = [];
      this.guideTrips.data.map
      ((tripToDelete) => this.guide.data.relationships.trips.data.push(new Relationships('trips', tripToDelete.id)));

    }
  }

  getTripsByGuide() {
    this.tripService.getTripsByGuideId(this.guideId).subscribe((guideTrips: RootObjectList<Trip>) => {
      if (guideTrips) {
        this.guideTrips = guideTrips;
        this.guideTrips.data.map(
          trips => trips.attributes.isChecked = true
        );
      }
    });
  }

  countriesFilter(filter) {
    if (!filter.tripname && filter.countryId) {
      this.tripService.getAllTripsByCountryId(filter.countryId).subscribe(
        tripsByCountry => {
          this.trips = tripsByCountry;
          this.CompareTripsChecked();
        });

    } else if (!filter.countryId && filter.tripname) {
      this.tripService.getAllTripsByName(filter.tripname).subscribe((trips) => {
        this.trips = trips;
        this.CompareTripsChecked();
      });
    }else if (!filter.tripname && !filter.countryId) {
      this.snackBar.open(`Sélectionnez au moins un filtre`, '🤚', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
    else {
      this.tripService.getAllTripsByGuideIdAndName(this.guideId, filter.tripname).subscribe((trips) => {
        this.trips = trips;
        this.CompareTripsChecked();
      });
    }
  }

  CompareTripsChecked() {
    this.trips.data.map((trip) => this.guideTrips.data.map((tripToCompare) => {
      if (tripToCompare.id === trip.id) {
        trip.attributes.isChecked = true;
      }
    }));
  }
// Methode for Poi Search component
refreshPlaces(event){
this.placeService.getByNameAndCity(event).subscribe((places) => {
  this.placeResults = places;
  this.placeResults.data.map((place ) => this.places.data.map((placeToCompare) => {
    if (place.id === placeToCompare.id){
      place.attributes.ischecked = true;
    }
  }));
  this.placeResults.data.map((place) => this.PicturesPlaceResults$.push(this.getGuidePicture(place.id)));
});
}
addPlace(event){

  if (event.attributes.ischecked){
    this.places.data.push(event);
    const temp = this.places.data;
    this.places = new RootObjectList<Place>(Place, 'places');
    this.places.data = temp;
    this.PicturesUrl$ = [];
    this.places.data.map((place) => this.PicturesUrl$.push(this.getGuidePicture(place.id)));


    if (!this.guide.data.relationships){
    this.guide.data.relationships = {};
    this.guide.data.relationships.places = {};
  }
    this.guide.data.relationships.places.data = [];
    this.places.data.map((placeToAdd) => this.guide.data.relationships.places.data.push(new Relationships('places', placeToAdd.id)));
}else {
  this.deletePlacesGuide(event);
}
}
}
