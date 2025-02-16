import { zoomLevelToResolutionDeg } from '@map-colonies/mc-utils';
import { Domain, ProductType } from '@map-colonies/types';
import { ValidationRules } from '../../types/core';
import { pickEnum } from '../../utils/typeUtils';

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
  url: {
    pattern: '^https?://[^\\s/$.?#].[^\\s]*$',
    description: 'URL must start with http:// or https://',
  },
  resolutionDeg: {
    min: zoomLevelToResolutionDeg(22) as number,
    max: zoomLevelToResolutionDeg(0) as number,
    description: 'Resolution in degrees',
  },
} satisfies ValidationRules;
/* eslint-enable @typescript-eslint/no-magic-numbers */
/* eslint-enable @typescript-eslint/naming-convention */
