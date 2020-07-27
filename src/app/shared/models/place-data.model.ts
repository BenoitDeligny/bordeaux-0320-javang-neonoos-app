export class PlaceData {
  wikidata?: string;
  price?: number;
  stars?: number;
  created?: string;
  updated?: string;

  constructor(placeData?: PlaceData) {
    Object.assign(this, placeData);
  }
}


