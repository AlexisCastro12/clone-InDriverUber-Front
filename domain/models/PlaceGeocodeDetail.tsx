export interface PlaceGeocodeDetail {
  plus_code: PlusCode
  results: Result[]
  status: string
}

export interface PlusCode {
  compound_code: string
  global_code: string
}

export interface Result {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: Geometry
  navigation_points?: NavigationPoint[]
  place_id: string
  types: string[]
  plus_code?: PlusCode2
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface Geometry {
  bounds?: Bounds
  location: Location
  location_type: string
  viewport: Viewport
}

export interface Bounds {
  northeast: Northeast
  southwest: Southwest
}

export interface Northeast {
  lat: number
  lng: number
}

export interface Southwest {
  lat: number
  lng: number
}

export interface Location {
  lat: number
  lng: number
}

export interface Viewport {
  northeast: Northeast2
  southwest: Southwest2
}

export interface Northeast2 {
  lat: number
  lng: number
}

export interface Southwest2 {
  lat: number
  lng: number
}

export interface NavigationPoint {
  location: Location2
}

export interface Location2 {
  latitude: number
  longitude: number
}

export interface PlusCode2 {
  compound_code: string
  global_code: string
}
