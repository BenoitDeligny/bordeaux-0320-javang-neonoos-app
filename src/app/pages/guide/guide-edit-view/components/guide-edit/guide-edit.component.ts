import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable, concat, of } from 'rxjs';
import { Guide } from 'src/app/pages/guide/models/guide';
import { GuideService } from 'src/app/pages/guide/services/guide/guide.service';
import { Hashtag } from 'src/app/shared/models/hashtag';
import { FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import 'quill-emoji/dist/quill-emoji.js';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { DialogSaveComponent } from 'src/app/shared/components/dialog-save/dialog-save.component';
@Component({
  selector: 'neo-guide-edit',
  templateUrl: './guide-edit.component.html',
  styleUrls: ['./guide-edit.component.scss']
})
export class GuideEditComponent implements OnInit {

  subscription = new Subscription();
  show = true;
  dialogTitle: string;
  @Input() guideId: number;
  updated = false;
  @Input() guide?: RootObject<Guide>;

  // Mat-chips
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hashtagCtrl = new FormControl();
  allHashtags: RootObjectList<Hashtag> = new RootObjectList<Hashtag>(Hashtag, 'hashtags');
  guideHashtags: RootObjectList<Hashtag> = new RootObjectList<Hashtag>(Hashtag, 'hashtags');
  filteredHashtags: Observable<any[]>;

  @ViewChild('hashtagInput') hashtagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private guideService: GuideService,
    private hashtagService: HashtagService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getHashtags();
    this.getGuideHastags();
    this.guideHashtags.data.shift();
  }


  getHashtags() {
/*     const getHashtagsSubscription = this.hashtagService.getAll().subscribe((hashtags: RootObjectList<Hashtag>) => {
      if (hashtags) {
        this.allHashtags = hashtags;
      }
      this.hashtagCtrl.setValue(null);

      if (!this.filteredHashtags) {
        this.listenChanges();
      }
    });
    this.subscription.add(getHashtagsSubscription); */
  }

  getGuideHastags() {
/*     if (this.guideId) {
      const getGuideHastagsSubscription = this.guideService.getHashtagsByGuide(this.guideId).subscribe((data: RootObjectList<Hashtag>) => {
        if (data) {
          this.guideHashtags = data;
        }
      });
      this.subscription.add(getGuideHastagsSubscription);
    } */
  }

  // Mat-chips method
  selected(event: MatAutocompleteSelectedEvent): void {
    this.guideHashtags.data.push(event.option.value);
    this.hashtagInput.nativeElement.value = '';
    this.hashtagCtrl.setValue(null);
    this.updated = true;
    console.log(this.guideHashtags);

  }

  remove(hashtag: Hashtag): void {
    for (let i = 0; i < this.guideHashtags.data.length; i++) {
      if (this.guideHashtags.data[i].id === hashtag.id) {
        this.guideHashtags.data.splice(i , 1);
        break;
      }
    }
    this.updated = true;
  }

  listenChanges() {
    this.filteredHashtags = this.hashtagCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map(hashtag => {
        if (hashtag && typeof hashtag === 'string') {
          return this._filter(hashtag);
        }
        if (this.allHashtags && this.allHashtags.data.length > 0) {
          return this.allHashtags.data.slice();
        }
      })
    );
  }

  _filter(value: string): any {
    const filterValue = value.toLowerCase();
    return this.allHashtags.data.filter(hashtag => hashtag.attributes.name.toLowerCase().indexOf(filterValue) === 0);
  }

  openDialog() {
    if (this.guideId) {
      this.dialogTitle = 'Voulez-vous modifier ce guide ?';
    } else {
      this.dialogTitle = 'Voulez-vous ajouter ce guide ?';
    }
    const dialogRef = this.dialog.open(DialogSaveComponent, {
      data: {dialogTitle: this.dialogTitle}
    });

    dialogRef.afterClosed().subscribe( result => {
      this.save(result);
    });


  }

  // Persistence
  save(result: boolean) {

    if (result) {
      if (this.guideId) {
        this.guideService.patch(this.guide, this.guideId).subscribe();
        this.snackBar.open(`"${this.guide.data.attributes.title}" a bien été modifié !`, '👍', {
          duration: 2000
        });
      } else {
        this.guideService.post(this.guide).subscribe(response => {
          this.guide = response;
          if (this.guide.data.id) {
            this.guideService.patchHashtagsByGuide(this.guide.data.id, this.guideHashtags).subscribe();
          }
        });
        this.snackBar.open(`"${this.guide.data.attributes.title}" a bien été ajouté !`, '👍', {
          duration: 2000
        });
      }
      if (this.updated && this.guideId) {
        this.guideService.patchHashtagsByGuide(this.guideId, this.guideHashtags).subscribe();
      }

    }
  }
}

