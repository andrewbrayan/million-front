import { getEnvironment } from "@core/store/actions/environments.action";
import { getPos } from "@core/store/actions/geo-location-coordinates.actions";
import httpAdapter from "@shared/utils/http-adapter";

export const BOGOTA_POS = { lat: -74.1076533, lng: 4.5778656 };

export interface GeocodingResponse {
  type: string;
  features: Feature[];
  attribution: string;
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface Properties {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name: string;
  name_preferred: string;
  coordinates: Coordinates;
  place_formatted: string;
  bbox: number[];
  context: Context;
}

export interface Context {
  district: District;
  region: Region;
  country: Country;
  place: District;
  postcode?: Neighborhood;
  neighborhood?: Neighborhood;
}

export interface Country {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  country_code: string;
  country_code_alpha_3: string;
}

export interface District {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
}

export interface Neighborhood {
  mapbox_id: string;
  name: string;
}

export interface Region {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  region_code: string;
  region_code_full: string;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Coord {
  lng: number;
  lat: number;
}

export const geocodingService = async (
  search: string,
  origin?: Coord
) => {
  if (search.length < 3) return;
  const { lat, lng } = origin ?? getPos() ?? BOGOTA_POS;
  const proximity = [lat, lng].join(",");
  const response = await httpAdapter<GeocodingResponse>({
    baseURL: "https://api.mapbox.com",
    url: "/search/geocode/v6/forward",
    params: {
      q: search,
      proximity: proximity,
      session_token: "09d2244c-1a3f-45b1-8994-5c1f3cc00917",
      access_token: getEnvironment("mapboxAccessToken"),
    },
  });

  return response.features;
};
