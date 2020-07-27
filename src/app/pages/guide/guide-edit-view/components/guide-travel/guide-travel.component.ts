import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { TripService } from '../../../services/trip/trip.service';
import { Country } from 'src/app/shared/models/country';
import { CountryService } from 'src/app/shared/services/country.service';
import { Trip } from 'src/app/shared/models/trip';
import { GuideService } from '../../../services/guide/guide.service';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { Guide } from '../../../models/guide';

@Component({
  selector: 'neo-guide-travel',
  templateUrl: './guide-travel.component.html',
  styleUrls: ['./guide-travel.component.scss']
})
export class GuideTravelComponent implements OnInit {


  @Input() guideTrips: RootObjectList<Trip> = new RootObjectList<Trip>(Trip, 'trips');
  @Input() trips?: RootObjectList<Trip>;
  country: Country;
  countryId: number;
  tripName: string;

  @Input() guide: RootObject<Guide>;
  @Input() guideId: number;
  @Input() countries: RootObjectList<Country>;
  @Output() addOrRemoveTrip = new EventEmitter();
  @Output() countriesFilter = new EventEmitter();


  constructor(
    private tripService: TripService,
    private countryService: CountryService,
    private guideService: GuideService) {

  }

  ngOnInit(): void {
  }

  onSubmit() {


    console.log(this.tripName);
    console.log(this.countryId);


    this.countriesFilter.emit({
      tripname: this.tripName,
      countryId: this.countryId
    });

  }

  toggleTrip(trip) {
    this.addOrRemoveTrip.emit(trip);
  }

}
