import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { Hashtag } from 'src/app/shared/models/hashtag';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { MatDialog } from '@angular/material/dialog';
import { Guide } from '../../../models/guide';
import { GuideService } from '../../../services/guide/guide.service';



@Component({
  selector: 'neo-guide-filter',
  templateUrl: './guide-filter.component.html',
  styleUrls: ['./guide-filter.component.scss']
})

export class GuideFilterComponent implements OnInit {

  @Output() checkboxEvent = new EventEmitter();
  @Output() GuidesEventEmitter = new EventEmitter<any>();

  constructor( private guidesService: GuideService ) { }

  // hashtags: RootObjectList<Hashtag>;
  // hashtagsSearch: RootObjectList<Hashtag>;

  searchValue: string;
  _searchValue: string;

  arrayHashtags = [];
  message: string;
  showTitleHashtags = 'Tout voir';
  showAllGuides = false;
  iconBtnGuides = 'add';

  // == Connexion backClient ==

    @Input() guides: RootObjectList<Guide>;

    tmphashtags = [];
    hashtags = [];




  // ==========================

  ngOnInit(): void { }

  // === Methode backClient ===

  getArrayHashtags(guides: RootObjectList<Guide>) {
    for (let i = 0; guides.data.length > i; i++) {
      const hashtags = guides.data[i].attributes.hashtags;
      if ( hashtags != null ) {
        const ArrayOfArrayHashtag = [];
        ArrayOfArrayHashtag.push(hashtags.split(' '));
        for (let k = 0; ArrayOfArrayHashtag.length > k; k++) {
          for (let y = 0; ArrayOfArrayHashtag[k].length > y; y++) {
            ArrayOfArrayHashtag[k][y] = ArrayOfArrayHashtag[k][y].replace(/[&\/\\#, +()$~%.'":;!*?<>{}]/gi, '');
            if (!this.tmphashtags.includes(ArrayOfArrayHashtag[k][y])) {
              this.tmphashtags.push(ArrayOfArrayHashtag[k][y]);
            }
          }
        }
      }
    }
  }


  // ==========================

  onSearchChange(searchValue: string): void {
    // searchValue = searchValue.toLowerCase();
    if ( searchValue != '') {
      this.hashtags = null;
      if (this.tmphashtags.length === 0) {
        this.getArrayHashtags(this.guides);
      }
      if (this.tmphashtags.includes(searchValue)) {
        this.hashtags = [];
        this.hashtags.push(searchValue);
      } else {
        this.hashtags = null;
        this.message = 'Aucun Résultat';
      }
      this.showTitleHashtags = 'Réinitialiser ';
    }
  }

  showHashtags() {

    this.getArrayHashtags(this.guides);

    if (this.showTitleHashtags === 'Tout voir') {
      this.getArrayHashtags(this.guides);
      this.hashtags = this.tmphashtags;
      this.showTitleHashtags = 'Réinitialiser ';
    } else {
      this.showTitleHashtags = 'Tout voir';
      this.hashtags = null;
      this.arrayHashtags = [];
      this.searchValue = '';
      this.message = '';
      this.checkboxEvent.emit(this.arrayHashtags);
    }
  }

  checkbox($event: any, tag: Hashtag) {
    if ($event.target.checked === true) {
      this.arrayHashtags.push(tag);
    }
    if ($event.target.checked === false) {
      for (let i = 0; i < this.arrayHashtags.length; i++) {
        if (this.arrayHashtags[i] === tag) {
          this.arrayHashtags.splice(i, 1);
        }
      }
    }
    // inisialise un nouveau tableau depuis tableau exitant :
    this.arrayHashtags = [...this.arrayHashtags];
    // Send CheckboxEvent
    this.checkboxEvent.emit(this.arrayHashtags);
  }

/*   openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogBodyComponent, dialogConfig);
    }
    */


  searchAllGuides() {
     if (this.showAllGuides === false) {
      this.showAllGuides = true;
      this.iconBtnGuides = 'remove';
    } else {
      this.showAllGuides = false;
      this.iconBtnGuides = 'add';
    }
     this.GuidesEventEmitter.emit(this.showAllGuides);
  }
}
