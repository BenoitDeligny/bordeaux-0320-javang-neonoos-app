export class Guide {
      description: string;
      lat_max: number;
      lng_max: number;
      lat_min: number;
      lng_min: number;
      selection: boolean;
      short_description?: string;
      title: string;
      thematic: boolean;
      weight: number;
      created?: string;
      hashtags: string;


  constructor( guide?: Guide){
    if (guide) {
      Object.assign(this, guide);
    }
 }
}
