import { Component, OnInit } from '@angular/core';
import { Hashtag } from 'src/app/shared/models/hashtag';
import { GuideService } from '../services/guide/guide.service';
import { Guide } from '../models/guide';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';

@Component({
  selector: 'neo-guide-view',
  templateUrl: './guide-view.component.html',
  styleUrls: ['./guide-view.component.scss']
})

export class GuideViewComponent implements OnInit {

  hashtags = [];
  allGuides?: RootObjectList<Guide>;
  guides: RootObjectList<Guide>;

  constructor(private guidesService: GuideService) { }

  ngOnInit(): void { this.getGuides(); }

  getGuides() {
    this.guidesService.getAllGuides().subscribe((guides) => {
      this.guides = guides;
    });
  }

  onHashtag($event) {
    this.hashtags = $event;
  }

  getAllGuides(showAllGuides) {
    if (showAllGuides === true) {
      this.allGuides = this.guides;
    } else {
      this.allGuides = null;
    }
  }
}
