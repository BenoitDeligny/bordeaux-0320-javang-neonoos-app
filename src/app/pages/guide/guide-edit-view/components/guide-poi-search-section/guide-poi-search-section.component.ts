import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Place } from 'src/app/shared/models/place.model';
import { Observable } from 'rxjs';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { Country } from 'src/app/shared/models/country';
import { collectExternalReferences } from '@angular/compiler';
@Component({
  selector: 'neo-guide-poi-search-section',
  templateUrl: './guide-poi-search-section.component.html',
  styleUrls: ['./guide-poi-search-section.component.scss']
})
export class GuidePoiSearchSectionComponent implements OnInit, OnChanges {
  @Input() countries: RootObjectList<Country>;
 @Input() places: RootObjectList<Place>;
 @Input() PicturesUrl$: Observable<string>[] = [] ;
 @Output() refreshPlaces = new EventEmitter();
 @Output() sendPlaceToadd = new EventEmitter();
 markers = [];
 map: mapboxgl.Map;
 countryId: number;
 placeName = '';
 city = '';
 rayon: any;
  constructor() { }

  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoicHJhbGluZTQwIiwiYSI6ImNrYmh5aTNqOTBhM2Yyem81NnI3a2hyMzAifQ.-Jq7YUy1fTIbegOvvl-4sA';
    if (this.places?.data.length > 0){
      this.initMap(this.places.data[0].attributes.lng, this.places.data[0].attributes.lat);
      this.places.data.map((place) => {
        this.addMarker(place.attributes.lng, place.attributes.lat, place.attributes.name, place.attributes.description);
        });
    } else {
      this.initMap(40, 50);
    }

  }
  initMap(lng, lat){
    this.map = new mapboxgl.Map({
      container: 'mapbox2',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 7
    });
  }

addMarker(lng: number, lat: number, name, description){
  const popup = new mapboxgl.Popup({ offset: 25 })
  .setHTML('<h3>' + name + '</h3><p>' + description + '</p>');
  const marker = new mapboxgl.Marker({
    draggable: false
    })
    .setLngLat([lng, lat])
    .addTo(this.map)
    .setPopup(popup);

  this.markers.push(marker);
}


ngOnChanges() {

  if (this.markers.length > 0){

  this.markers.map((marker) => marker.remove());
  this.places.data.map((place) => {
    this.addMarker(place.attributes.lng, place.attributes.lat, place.attributes.name, place.attributes.description);
  });
}
  if (this.places) {
  this.places.data.map((place) => {
  this.addMarker(place.attributes.lng, place.attributes.lat, place.attributes.name, place.attributes.description);
  if (this.places.data[0].attributes.lng){
    this.map.flyTo({
      center: [
        this.places.data[0].attributes.lng,
        this.places.data[0].attributes.lat
        ],
        essential: true
    });
  }

});
}
  }


  onStarsboxEvent(event){
    console.log(event);

  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) + 'Km';
    }
    return value;
  }
  refreshPlace(){
    const filter = this.placeName + ' ' + this.city;
    this.refreshPlaces.emit(filter);
  }
  addPlace(place){
    this.sendPlaceToadd.emit(place);
  }
}
