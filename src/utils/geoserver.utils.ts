import {
  GeoserverFeatureTypesList,
  POLYGON_PARTS_FEATURE_TYPE_ATTRIBUTES,
  POLYGON_PARTS_FEATURE_TYPE_DEFAULTS,
  WORLD_BOUNDING_BOX,
} from '../constants/core/geoserver.constants';
import type {
  GeoserverConfiguredFeatureTypesResponse,
  GeoserverCreateFeatureTypeRequest,
  GeoserverFeatureTypeNamesResponse,
  PolygonPartsFeatureTypeOptions,
} from '../types/core/geoserver.type';

const toArray = <T>(value: T | T[] | undefined): T[] => {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export function buildPolygonPartsFeatureTypeBody(options: PolygonPartsFeatureTypeOptions): GeoserverCreateFeatureTypeRequest {
  const {
    nativeName,
    name = nativeName,
    srs = POLYGON_PARTS_FEATURE_TYPE_DEFAULTS.srs,
    numDecimals = POLYGON_PARTS_FEATURE_TYPE_DEFAULTS.numDecimals,
  } = options;
  const boundingBox = { ...WORLD_BOUNDING_BOX, crs: srs };

  return {
    featureType: {
      name,
      nativeName,
      srs,
      nativeBoundingBox: boundingBox,
      latLonBoundingBox: { ...boundingBox },
      numDecimals,
      attributes: { attribute: POLYGON_PARTS_FEATURE_TYPE_ATTRIBUTES.map((attribute) => ({ ...attribute })) },
    },
  };
}

export function parseFeatureTypeNames(
  response: GeoserverConfiguredFeatureTypesResponse | GeoserverFeatureTypeNamesResponse,
  listType: GeoserverFeatureTypesList
): string[] {
  if (listType === GeoserverFeatureTypesList.CONFIGURED) {
    const { featureTypes } = response as GeoserverConfiguredFeatureTypesResponse;
    return featureTypes === '' ? [] : toArray(featureTypes.featureType).map((featureType) => featureType.name);
  }
  const { list } = response as GeoserverFeatureTypeNamesResponse;
  return list === '' ? [] : toArray(list.string);
}
