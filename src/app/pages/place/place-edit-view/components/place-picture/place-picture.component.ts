import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Picture } from 'src/app/shared/models/picture.model';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { Data } from 'src/app/shared/models/data.model';
import { Relationships } from 'src/app/shared/models/relationships.model';
import { Place } from 'src/app/shared/models/place.model';

@Component({
  selector: 'neo-place-picture',
  templateUrl: './place-picture.component.html',
  styleUrls: ['./place-picture.component.scss']
})
export class PlacePictureComponent implements OnInit {

  @Input() place: RootObject<Place>;
  @Input() placeId: number;

  // picture Form Prop
  pictureUrl = '';
  pictureTitle = '';

  placePictures: RootObject<Picture>[];

  tempPlacePictures = new RootObjectList<Picture>(Picture, 'pictures');

  constructor(public dialog: MatDialog, private picturesService: ActivityService) { }

  ngOnInit(): void {
    this.tempPlacePictures.data = [];
    this.placePictures = [];

    // PICTURES BEGIN

    this.picturesService.getPicturesByPlaceId(this.placeId).subscribe(
      (data: RootObject<Picture>[]) => {
        for (const picture of data) {
          if (picture.data.attributes.filename.substring(0, 5) === 'https') {
            picture.data.attributes.isExt = true;
          }
          this.placePictures.push(picture);
        }
        // this.placePictures = data;
      }
    );
    // PICTURES END

  }

  // add picture
  addPicture(url: string, title: string) {
    const currentPicture = new RootObject<Picture>(Picture);

    currentPicture.data.attributes.filename = this.pictureUrl;
    currentPicture.data.attributes.name = this.pictureTitle;
    currentPicture.data.attributes.isExt = true;
    currentPicture.data.type = 'pictures';
    currentPicture.data.relationships = {
      place: {
        data: {
          id: this.placeId
        }
      }
    };

    this.picturesService.postPictures(currentPicture).subscribe(
      (pictures) => this.placePictures = pictures
    );
  }

  deletePicture(picture: RootObject<Picture>) {
    this.picturesService.deletePictures(picture.data.id).subscribe();
  }

  isExt(picture: Picture) {
    picture.isExt = !picture.isExt;
  }

}
