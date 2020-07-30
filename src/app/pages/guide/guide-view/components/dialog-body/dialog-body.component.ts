import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Hashtag } from 'src/app/shared/models/hashtag';
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { RootObject } from 'src/app/shared/models/root-object.model';

@Component({
  selector: 'neo-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  hashtag?: RootObject<Hashtag> = new RootObject<Hashtag>(Hashtag, 'hashtags');

  constructor( public dialogRef: MatDialogRef<DialogBodyComponent>, private hashtagService: HashtagService ) { }

  ngOnInit(): void { }

  onSubmit() {
    if ( this.hashtag.data.attributes.name ) {
      this.hashtagService.post(this.hashtag).subscribe( (hashtag) => {
        if (hashtag) {
          this.onNoClick();
        }
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
