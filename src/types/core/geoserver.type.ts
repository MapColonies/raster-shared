// GeoServer serializes an empty list as an empty string and a single item as an object instead of an array
type GeoserverList<T> = T | T[] | undefined;

export interface GeoserverBoundingBox {
  minx: number;
  maxx: number;
  miny: number;
  maxy: number;
  crs: string;
}

export interface GeoserverFeatureTypeAttribute {
  name: string;
  minOccurs: number;
  maxOccurs: number;
  nillable: boolean;
  binding: string;
  /** source column in the polygon parts table, when it differs from the exposed attribute name */
  source?: string;
}

/** body of POST /rest/workspaces/{workspace}/datastores/{dataStore}/featuretypes */
export interface GeoserverCreateFeatureTypeRequest {
  featureType: {
    name: string;
    nativeName: string;
    srs: string;
    nativeBoundingBox: GeoserverBoundingBox;
    latLonBoundingBox: GeoserverBoundingBox;
    numDecimals: number;
    attributes: { attribute: GeoserverFeatureTypeAttribute[] };
  };
}

export interface PolygonPartsFeatureTypeOptions {
  /** table name in the polygon parts schema */
  nativeName: string;
  /** published layer name, defaults to nativeName */
  name?: string;
  srs?: string;
  numDecimals?: number;
}

/** response of GET .../featuretypes?list=all|available|available_with_geom */
export interface GeoserverFeatureTypeNamesResponse {
  list: { string?: GeoserverList<string> } | '';
}

/** response of GET .../featuretypes?list=configured */
export interface GeoserverConfiguredFeatureTypesResponse {
  featureTypes: { featureType?: GeoserverList<{ name: string; href: string }> } | '';
}
