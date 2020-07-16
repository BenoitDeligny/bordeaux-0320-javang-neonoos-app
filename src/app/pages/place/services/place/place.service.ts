import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from 'src/app/shared/models/place.model';
import { environment } from 'src/environments/environment';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Observable } from 'rxjs';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { map } from 'rxjs/operators';
import { Country } from 'src/app/shared/models/country';

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

  getCountryByPlace(id: number): Observable<RootObjectList<Country>> {
    return this.httpClient.get<RootObjectList<Country>>(`${environment.APIURI}places/${id}/countries`);
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
}
