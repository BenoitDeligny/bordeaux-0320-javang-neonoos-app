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

  constructor(private http: HttpClient) { }

  getAll(): Observable<RootObjectList<Place>> {
    return this.http.get<RootObjectList<Place>>(`${environment.APIURI}places`)
    .pipe(map((places) => places = new RootObjectList<Place>(Place, 'places', places)));
  }

  getById(id: number): Observable<RootObject<Place>>{
    return this.http.get<RootObject<Place>>(`${environment.APIURI}places/` + id);
  }

  getCountryByPlace(id: number): Observable<RootObject<Country>> {
    return this.http.get<RootObject<Country>>(`${environment.APIURI}places/${id}/country`);
  }
  
  getPlaceDataById(id: number): Observable<RootObject<PlaceData>> {
    return this.http.get<RootObject<PlaceData>>(`${environment.APIURI}places/${id}/data`);
  }

  post(place: RootObject<Place>): Observable<RootObject<Place>> {
    return this.http.post<RootObject<Place>>(`${environment.APIURI}places`, place);
  }

  patch(place: RootObject<Place>, id: number): Observable<RootObject<Place>>{
    return this.http.patch<RootObject<Place>>(`${environment.APIURI}places/` + id, place)
    .pipe(map((placefrmsrv) => this.createInstance(placefrmsrv)));
  }

  createInstance(place: RootObject<Place>){
    return new RootObject<Place>(Place, 'places', place);
  }
}
