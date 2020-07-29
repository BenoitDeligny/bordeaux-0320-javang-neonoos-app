import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { Place } from 'src/app/shared/models/place.model';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Country } from 'src/app/shared/models/country';
import { PlaceData } from 'src/app/shared/models/place-data.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogSaveComponent } from 'src/app/shared/components/dialog-save/dialog-save.component';
import { GuideService } from 'src/app/pages/guide/services/guide/guide.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'neo-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.scss']
})
export class PlaceEditComponent implements OnInit {

  @Input() place: RootObject<Place>;
  @Input() placeId: number;
  @Input() countries: RootObjectList<Country>;
  @Input() country: RootObject<Country>;
  @Input() placeData: RootObject<PlaceData>;

  countryToPatch: RootObject<Country>;
  dialogTitle: string;
  show = true;
  arrayCheckStars: [];
pictureurl$: Observable<string> ;
  @Output() patchPlace = new EventEmitter();
  @Output() patchCountryInPlace = new EventEmitter();
  @Output() postPlace = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private guideService: GuideService
  ) { }

  ngOnInit(): void {
    this.pictureurl$ = this.guideService.getPictureGuide(this.placeId).pipe(map((picture) => {
      return  picture.data[0]?.attributes.filename;
     }));
  }

  compareObjects(country1: any, country2: any) {
    return country1.id === country2.id;
  }

  openDialog() {
    if (this.placeId) {
      this.dialogTitle = 'Voulez-vous modifier cette place ?';
    } else {
      this.dialogTitle = 'Voulez-vous ajouter cette place ?';
    }
    const dialogRef = this.dialog.open(DialogSaveComponent, {
      data: {dialogTitle: this.dialogTitle}
    });

    dialogRef.afterClosed().subscribe( result => {
      this.save(result);
    });
  }

  onStarsboxEvent(arrayChecks) {
    this.arrayCheckStars = arrayChecks;
  }

  save(result: boolean) {
    if (result && this.placeId) {
      this.patchPlace.emit({place: this.place, countryId: this.country.data.id});
    }

    if (result && !this.placeId) {
      console.log(this.country.data.id);
      this.postPlace.emit({place: this.place, countryId: this.country.data.id});
    }
  }

}
