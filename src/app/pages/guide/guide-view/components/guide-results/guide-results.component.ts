import { Component, OnInit, Input } from '@angular/core';
import { Guide } from '../../../models/guide';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Hashtag } from 'src/app/shared/models/hashtag';
import { Data } from 'src/app/shared/models/data.model';
import { GuideService } from '../../../services/guide/guide.service';

@Component({
  selector: 'neo-guide-results',
  templateUrl: './guide-results.component.html',
  styleUrls: ['./guide-results.component.scss']
})
export class GuideResultsComponent implements OnInit {

  _hashtags: Data<Hashtag>[] = [];
  _showAllGuides: boolean;
  paginationNbrPages = 20;
  paginationPages = 10;
  paginationCurrentPage: number;
  paginationFirst = 1;
  paginationLast: number;
  paginationNext: number;
  paginationPrev: number;


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
      const uri = '/api/guides?page[size]=' + this.paginationNbrPages + '&page[number]=' + this.paginationPages;
      this.guidePagination(uri);
    } else {
      this.guides = null;
    }
  }

  constructor(private guidesService: GuideService) { }

  ngOnInit(): void { }

  guidePagination(uri) {
    this.guidesService.getGuidesPaginator(uri).subscribe((guides) => {
      this.guides = guides;
      this.paginationCurrentPage = this.guides['links'].first?.split('&')[1].replace(/[^0-9-]/gi, '');
      this.paginationLast = this.guides['links'].last?.split('&')[1].replace(/[^0-9-]/gi, '');
      this.paginationPrev = this.guides['links'].prev?.split('&')[1].replace(/[^0-9-]/gi, '');
      this.paginationNext = this.guides['links'].next?.split('&')[1].replace(/[^0-9-]/gi, '');
    });
  }

  clickPagination(event) {

    console.log(event);

    console.log(this.paginationLast);

    const uri = '/api/guides?page[size]=' + this.paginationNbrPages + '&page[number]=' + event;
    this.guidePagination(uri);

  }

}

