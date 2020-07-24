import { Component, OnInit, Input } from '@angular/core';
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { Guide } from '../../../models/guide';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { forkJoin, Observable } from 'rxjs';
import { Hashtag } from 'src/app/shared/models/hashtag';
import { Data } from 'src/app/shared/models/data.model';
import { GuideService } from '../../../services/guide/guide.service';

@Component({
  selector: 'neo-guide-results',
  templateUrl: './guide-results.component.html',
  styleUrls: ['./guide-results.component.scss']
})
export class GuideResultsComponent implements OnInit {

/* hashtag?: RootObject<Hashtag> = new RootObject<Hashtag>(Hashtag, 'hashtags');
guides: RootObjectList<Guide>;
guideSections: RootObjectList<Guide>[] = []; */

/* guideSections$: Observable<RootObjectList<Guide>[]>;
_hashtags: Data<Hashtag>[] = [];
show = true;
titleHashtag = 'Edite';
hashtagId: number; */

_hashtags: Data<Hashtag>[] = [];
_showAllGuides: boolean;

hashtagsSections = [];


guides: RootObjectList<Guide>;
@Input() set hashtags(hashtags: []) {
  this.hashtagsSections = [];
  if (hashtags.length > 0) {
    for (let i = 0; hashtags.length > i; i++) {
      this.guidesService.getGuidesByHashtag(hashtags[i]).subscribe((guides) => {
        const objHashtag = new Object();
        objHashtag['name'] = hashtags[i];
        objHashtag['guides'] = guides;
        this.hashtagsSections.push(objHashtag);
      });
    }
  }
}
@Input() set showAllGuides(showAllGuides: boolean) {
  if (showAllGuides === true) {
    const uri = "/api/guides?page[size]=20&page[number]=1";
    this.guidesService.getGuidesPaginator(uri).subscribe((guides) => {
      this.guides = guides;
    });
  } else {
    this.guides = null;
  }
}

constructor(private guidesService: GuideService) { }

ngOnInit(): void { }

clickPagination($event) {

}

  /* updateHashtagName(id: number, name: string) {

    if (this.show === true ) {
      this.show = false;
      this.hashtagId = id;
    } else {

      if (this.hashtagId === id) {
        this.hashtagService.getById(id).subscribe((hashtag) => {
          this.hashtag = hashtag;
          if ( this.hashtag.data.id === this.hashtagId) {
            this.hashtag.data.attributes.name = name;
            this.hashtagService.patch(hashtag, id).subscribe();
            this.show = true;
            this.hashtagId = null;
          }
        });
      } else {
        this.hashtagId = id;
      }
    }
  }*/
}

