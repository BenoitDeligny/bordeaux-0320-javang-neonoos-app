export class Place {
  address: string;
  area_level: number;
  barometer: number;
  base_ratings: string;
  city: string;
  created: string;
  description: string;
  draft: boolean;
  genius: boolean;
  genius_stars: number;
  lat: number;
  lat_max: number;
  lat_min: number;
  lng: number;
  lng_max: number;
  lng_min: number;
  name: string;
  osm: number;
  plc: boolean;
  price_range: number;
  rating: number;
  rating_count: number;
  searchables: boolean;
  total_stars: number;
  type: string;
  updated: string;
  weight: number;
  ischecked = false;

  constructor(place?: Place) {
    Object.assign(this, place);
  }
}
