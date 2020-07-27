import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Guide } from '../../models/guide';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Hashtag } from 'src/app/shared/models/hashtag';
import { Place } from 'src/app/shared/models/place.model';
import { Trip } from 'src/app/shared/models/trip';
import { Picture } from 'src/app/shared/models/picture.model';


@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<RootObject<Guide>[]> {
    return this.http.get<RootObject<Guide>[]>(`${environment.APIURI}guides`).pipe(map((guides) => guides
    .map((guide) => this.createInstance(guide))));
  }

  getAllGuides(): Observable<RootObjectList<Guide>> {
    return this.http.get<RootObjectList<Guide>>(`${environment.APIURI}guides`);
  }

  getById(id: number): Observable<RootObject<Guide>>{
    return this.http.get<RootObject<Guide>>(`${environment.APIURI}guides/` + id).pipe(map((guide) => this.createInstance(guide)));
  }

  getPlacesByGuide(id: number): Observable<RootObjectList<Place>> {
    return this.http.get<RootObjectList<Place>>(`${environment.APIURI}guides/${id}/places`);
  }

  getPictureGuide(id: number): Observable<RootObjectList<Picture>> {
    return this.http.get<RootObjectList<Picture>>(`${environment.APIURI}places/${id}/pictures`);
  }

  getGuidesByHashtag(data): Observable<RootObjectList<Guide>> {
    return this.http.get<RootObjectList<Guide>>(`${environment.APIURI}guides?filter[search]=%23${data}`);
  }

  getGuidesPaginator(links): Observable<RootObjectList<Guide>> {
    return this.http.get<RootObjectList<Guide>>(`${environment.URI}${links}`);
  }

  getHashtagsByGuide(id: number): Observable<RootObjectList<Hashtag>> {
    return this.http.get<RootObjectList<Hashtag>>(`${environment.APIURI}guides/${id}/hashtags`);
  }

  patchPlacesByGuide(id: number, place: RootObjectList<Place>): Observable<RootObjectList<Place>> {
    return this.http.patch<RootObjectList<Place>>(`${environment.APIURI}guides/${id}/relationships/places`, place);
  }

  patchHashtagsByGuide(id: number, hashtag: RootObjectList<Hashtag>): Observable<RootObjectList<Hashtag>> {
    return this.http.patch<RootObjectList<Hashtag>>(`${environment.APIURI}guides/${id}/relationships/hashtags`, hashtag);
  }

  patchTripsByGuide(id: number, trip: RootObjectList<Trip>): Observable<RootObjectList<Trip>> {
    return this.http.patch<RootObjectList<Trip>>(`${environment.APIURI}guides/${id}/relationships/trips`, trip);
  }

  post(guide: RootObject<Guide>): Observable<RootObject<Guide>>{
    return this.http.post<RootObject<Guide>>(`${environment.APIURI}guides`, guide)
      .pipe(map((guidefrmsrv) => this.createInstance(guidefrmsrv)));
  }

  patch(guide: RootObject<Guide>, id: number): Observable<RootObject<Guide>>{
    return this.http.patch<RootObject<Guide>>(`${environment.APIURI}guides/` + id, guide)
      .pipe(map((guidefrmsrv) => this.createInstance(guidefrmsrv)));
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.APIURI}guides/` + id);
  }

  createInstance(guide: RootObject<Guide>){
    return new RootObject<Guide>(Guide, 'guides', guide);
  }
}
