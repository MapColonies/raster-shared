import { zoomLevelToResolutionDeg, zoomLevelToResolutionMeter } from '@map-colonies/mc-utils';
import { Domain, ProductType } from '@map-colonies/types';
import { ValidationRules } from '../../types/core';
import { pickEnum } from '../../utils/helpers.utils';

export const RASTER_DOMAIN = Domain.RASTER;

/* eslint-disable @typescript-eslint/naming-convention */
export const RasterProductTypes = pickEnum(ProductType, [
  'ORTHOPHOTO',
  'ORTHOPHOTO_HISTORY',
  'ORTHOPHOTO_BEST',
  'RASTER_MAP',
  'RASTER_MAP_BEST',
  'RASTER_AID',
  'RASTER_AID_BEST',
  'RASTER_VECTOR',
  'RASTER_VECTOR_BEST',
]);

export const GEODETIC_GRIDS: readonly string[] = ['WorldCRS84'];

export type RasterProductTypes = (typeof RasterProductTypes)[keyof typeof RasterProductTypes];

export const RASTER_PRODUCT_TYPE_LIST = Object.values(RasterProductTypes);

export const Transparency = {
  OPAQUE: 'OPAQUE',
  TRANSPARENT: 'TRANSPARENT',
} as const;

export type Transparency = (typeof Transparency)[keyof typeof Transparency];

export const TileOutputFormat = {
  PNG: 'PNG',
  JPEG: 'JPEG',
} as const;

export type TileOutputFormat = (typeof TileOutputFormat)[keyof typeof TileOutputFormat];

export const TileOutputFormatList = Object.values(TileOutputFormat);

/* eslint-disable @typescript-eslint/no-magic-numbers */
export const CORE_VALIDATIONS = {
  classification: {
    pattern: '^[0-9]$|^[1-9][0-9]$|^(100)$',
    description: 'Classification value between 0 and 100',
  },
  horizontalAccuracyCE90: {
    min: 0.01,
    max: 4000,
  },
  polygonPartsEntityName: {
    pattern: '^[a-z][a-z0-9_]{0,61}[a-z0-9]$',
    description:
      'Polygon parts entity name must start with a letter, end with a letter or number, and contain only lowercase letters, numbers and underscores',
  },
  productId: {
    pattern: '^[A-Za-z]{1}[A-Za-z0-9_]{0,36}$',
    description: 'Product ID must start with a letter and contain only letters, numbers and underscores',
  },
  productVersion: {
    pattern: '^[1-9]\\d*\\.(0|[1-9]\\d*)$',
    description: 'Product version in the format "x.y", e.g. "1.0"',
  },
  resolutionDeg: {
    min: zoomLevelToResolutionDeg(22) as number, //best resolution
    max: zoomLevelToResolutionDeg(0) as number, //worst resolution
  },
  resolutionMeter: {
    min: zoomLevelToResolutionMeter(22) as number,
    max: zoomLevelToResolutionMeter(0) as number,
  },
  scale: {
    min: 0,
    max: 100000000,
  },
  sensor: {
    pattern: '^([^\\s])(.*[^\\s])?$',
    description: 'Sensor name must not start or end with whitespace',
  },
  url: {
    pattern: '^https?://[^\\s/$.?#].[^\\s]*$',
    description: 'Valid url string pattern, must start with http(s) protocols',
  },
} satisfies ValidationRules;
/* eslint-enable @typescript-eslint/no-magic-numbers */
/* eslint-enable @typescript-eslint/naming-convention */

export const HASH_ALGORITHMS = ['XXH64'] as const;
export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number];

export const MAX_ZOOM_LEVEL = 22;

/* eslint-disable @typescript-eslint/naming-convention */
export const SourceType = {
  S3: 'S3',
  GPKG: 'GPKG',
  FS: 'FS',
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export type SourceType = (typeof SourceType)[keyof typeof SourceType];

/* eslint-disable @typescript-eslint/naming-convention */
export const StorageProvider = {
  ...pickEnum(SourceType, ['FS', 'S3']),
  REDIS: 'REDIS',
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export type StorageProvider = (typeof StorageProvider)[keyof typeof StorageProvider];

/* eslint-disable @typescript-eslint/naming-convention */
export const InstanceType = {
  INGESTION: 'ingestion',
  EXPORT: 'export',
} as const;

export type InstanceType = (typeof InstanceType)[keyof typeof InstanceType];
/* eslint-enable @typescript-eslint/naming-convention */
