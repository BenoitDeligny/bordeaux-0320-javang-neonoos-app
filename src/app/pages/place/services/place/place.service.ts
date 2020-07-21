import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from 'src/app/shared/models/place.model';
import { environment } from 'src/environments/environment';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Observable } from 'rxjs';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { map } from 'rxjs/operators';
import { Country } from 'src/app/shared/models/country';
import { PlaceData } from 'src/app/shared/models/place-data.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<RootObjectList<Place>> {
    return this.httpClient.get<RootObjectList<Place>>(`${environment.APIURI}places`)
    .pipe(map((places) => places = new RootObjectList<Place>(Place, 'places', places)));
  }

  getById(id: number): Observable<RootObject<Place>>{
    return this.httpClient.get<RootObject<Place>>(`${environment.APIURI}places/` + id);
  }

  getCountryByPlace(id: number): Observable<RootObject<Country>> {
    return this.httpClient.get<RootObject<Country>>(`${environment.APIURI}places/${id}/country`);
  }

  getPlaceDataById(id: number): Observable<RootObject<PlaceData>> {
    return this.httpClient.get<RootObject<PlaceData>>(`${environment.APIURI}places/${id}/data`)
      .pipe(map((placeData) => this.createPlaceDataInstance(placeData)));
  }

  post(place: RootObject<Place>): Observable<RootObject<Place>> {
    return this.httpClient.post<RootObject<Place>>(`${environment.APIURI}places`, place);
  }

  patch(place: RootObject<Place>, id: number): Observable<RootObject<Place>>{
    return this.httpClient.patch<RootObject<Place>>(`${environment.APIURI}places/` + id, place)
    .pipe(map((placefrmsrv) => this.createInstance(placefrmsrv)));
  }

  createInstance(place: RootObject<Place>){
    return new RootObject<Place>(Place, 'places', place);
  }

  createPlaceDataInstance(placeData: RootObject<PlaceData>) {
    return new RootObject<PlaceData>(PlaceData, 'placedatas', placeData);

  }
}
