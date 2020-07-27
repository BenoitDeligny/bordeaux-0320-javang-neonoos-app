import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPictureDialogComponent } from '../add-picture-dialog/add-picture-dialog.component';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Picture } from 'src/app/shared/models/picture.model';
import { RootObject } from 'src/app/shared/models/root-object.model';

@Component({
  selector: 'neo-place-picture',
  templateUrl: './place-picture.component.html',
  styleUrls: ['./place-picture.component.scss']
})
export class PlacePictureComponent implements OnInit {

  addedPictures: RootObjectList<Picture> = new RootObjectList<Picture>(Picture, 'pictures');

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.addedPictures.data = [];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPictureDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      const currentAddedPicture: RootObject<Picture> = new RootObject<Picture>(Picture);

      currentAddedPicture.data.attributes.name = result;
      currentAddedPicture.data.attributes.filename = result;
      currentAddedPicture.data.attributes.created = new Date();
      currentAddedPicture.data.id = this.addedPictures.data.length;

      this.addedPictures.data.push(currentAddedPicture.data);
    });
  }

  deletePicture(id: number) {
    for (const picture of this.addedPictures.data) {
      if (id === picture.id) {
        this.addedPictures.data.splice(picture.id, 1);
      }
    }
  }

  isExt(picture: Picture) {
    picture.isExt = ! picture.isExt;
  }

}
