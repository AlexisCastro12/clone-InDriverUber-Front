export interface PlaceDetail {
  html_attributions: any[];
  result: Result;
  status: string;
}
export interface Result {
  address_components: Addresscomponent[];
  adr_address: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  place_id: string;
  plus_code: Pluscode;
  reference: string;
  types: string[];
  url: string;
  utc_offset: number;
  vicinity: string;
}
export interface Pluscode {
  compound_code: string;
  global_code: string;
}
export interface Geometry {
  location: Location;
  viewport: Viewport;
}
export interface Viewport {
  northeast: Location;
  southwest: Location;
}
export interface Location {
  lat: number;
  lng: number;
}
export interface Addresscomponent {
  long_name: string;
  short_name: string;
  types: string[];
}