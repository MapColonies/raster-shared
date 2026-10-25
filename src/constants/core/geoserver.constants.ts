import type { GeoserverFeatureTypeAttribute } from '../../types/core/geoserver.type';

/* eslint-disable @typescript-eslint/naming-convention */
export const GeoserverFeatureTypesList = {
  ALL: 'all',
  CONFIGURED: 'configured',
  AVAILABLE: 'available',
  AVAILABLE_WITH_GEOM: 'available_with_geom',
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export type GeoserverFeatureTypesList = (typeof GeoserverFeatureTypesList)[keyof typeof GeoserverFeatureTypesList];

/* eslint-disable @typescript-eslint/no-magic-numbers */
export const POLYGON_PARTS_FEATURE_TYPE_DEFAULTS = {
  srs: 'EPSG:4326',
  numDecimals: 100,
} as const;

export const WORLD_BOUNDING_BOX = { minx: -180, maxx: 180, miny: -90, maxy: 90 } as const;
/* eslint-enable @typescript-eslint/no-magic-numbers */

/** polygon parts table columns exposed by GeoServer, renamed from snake_case to camelCase */
export const POLYGON_PARTS_FEATURE_TYPE_ATTRIBUTES: readonly Readonly<GeoserverFeatureTypeAttribute>[] = [
  { name: 'id', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.util.UUID' },
  { name: 'catalogId', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.util.UUID', source: 'catalog_id' },
  { name: 'productId', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.lang.String', source: 'product_id' },
  { name: 'productType', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.lang.String', source: 'product_type' },
  { name: 'sourceId', minOccurs: 0, maxOccurs: 1, nillable: true, binding: 'java.lang.String', source: 'source_id' },
  { name: 'sourceName', minOccurs: 0, maxOccurs: 1, nillable: false, binding: 'java.lang.String', source: 'source_name' },
  { name: 'productVersion', minOccurs: 0, maxOccurs: 1, nillable: false, binding: 'java.lang.String', source: 'product_version' },
  { name: 'ingestionDateUTC', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.sql.Timestamp', source: 'ingestion_date_utc' },
  { name: 'imagingTimeBeginUTC', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.sql.Timestamp', source: 'imaging_time_begin_utc' },
  { name: 'imagingTimeEndUTC', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.sql.Timestamp', source: 'imaging_time_end_utc' },
  { name: 'resolutionDegree', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.math.BigDecimal', source: 'resolution_degree' },
  { name: 'resolutionMeter', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.math.BigDecimal', source: 'resolution_meter' },
  { name: 'sourceResolutionMeter', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'java.math.BigDecimal', source: 'source_resolution_meter' },
  { name: 'horizontalAccuracyCe90', minOccurs: 0, maxOccurs: 1, nillable: false, binding: 'java.lang.Float', source: 'horizontal_accuracy_ce90' },
  { name: 'sensors', minOccurs: 0, maxOccurs: 1, nillable: false, binding: 'java.lang.String', source: 'sensors' },
  { name: 'countries', minOccurs: 0, maxOccurs: 1, nillable: true, binding: 'java.lang.String', source: 'countries' },
  { name: 'cities', minOccurs: 0, maxOccurs: 1, nillable: true, binding: 'java.lang.String', source: 'cities' },
  { name: 'description', minOccurs: 0, maxOccurs: 1, nillable: true, binding: 'java.lang.String', source: 'description' },
  { name: 'footprint', minOccurs: 1, maxOccurs: 1, nillable: false, binding: 'org.locationtech.jts.geom.Polygon', source: 'footprint' },
];
