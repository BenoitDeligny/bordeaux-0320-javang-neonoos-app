import { Component, OnInit, Input, Output } from '@angular/core';
import 'quill-emoji/dist/quill-emoji.js';
import { Place } from 'src/app/shared/models/place.model';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { EventEmitter } from 'events';

@Component({
  selector: 'neo-place-description',
  templateUrl: './place-description.component.html',
  styleUrls: ['./place-description.component.scss']
})
export class PlaceDescriptionComponent implements OnInit {

  @Input() place?: RootObject<Place> = new RootObject<Place>(Place, 'places');

  constructor() { }
  ngOnInit(): void { }
}
