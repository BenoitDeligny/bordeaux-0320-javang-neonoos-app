import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hashtag } from '../models/hashtag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionTagService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Hashtag[]> {
    return this.httpClient.get<Hashtag[]>(`${environment.APIURI}hashtags`);
  }
}
