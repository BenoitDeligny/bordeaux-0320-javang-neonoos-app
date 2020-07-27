import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { env } from 'process';
import { RootObject } from '../models/root-object.model';
import { Picture } from '../models/picture.model';
import { Observable, forkJoin } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { RootObjectList } from '../models/root-object-list.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  public getPicturesByPlaceId(id: number): Observable<RootObject<Picture>[]> {
    return this.getPicturesIdByPlace(id).pipe(
      map(result => result.data.map((object: any) => this.getPictureById(object.id))),
      flatMap((images$: Observable<RootObject<Picture>>[]) => forkJoin(images$))
    );
  }

  private getPicturesIdByPlace(id: number): Observable<any> {
    return this.httpClient.get<RootObjectList<Picture>>(`${environment.APIURI}places/${id}/relationships/pictures`);
  }

  private getPictureById(id: number): Observable<RootObject<Picture>> {
    return this.httpClient.get<RootObject<Picture>>(`${environment.APIURI}pictures/${id}`);
  }

  postPictures(picture: RootObject<Picture>): Observable<RootObject<Picture>[]> {
    return this.httpClient.post<void>(`${environment.APIURI}pictures`, picture).pipe(
      flatMap(
        () => this.getPicturesByPlaceId(picture.data.relationships.place.data.id)
      )
    );
  }

  uploadPictures(picture: any) {

  }

  deletePictures(id: number) {
    return this.httpClient.delete(`${environment.APIURI}pictures/${id}`);
  }
}
