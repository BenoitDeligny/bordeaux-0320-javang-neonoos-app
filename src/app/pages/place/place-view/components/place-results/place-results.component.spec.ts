import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceResultsComponent } from './place-results.component';

describe('PlaceResultsComponent', () => {
  let component: PlaceResultsComponent;
  let fixture: ComponentFixture<PlaceResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
