/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { zoomLevelToResolutionMeter } from '@map-colonies/mc-utils';
import { ValidationRules } from '../../types/core';

/* eslint-disable @typescript-eslint/naming-convention */
export const JobTypes = {
  Ingestion_New: 'Ingestion_New',
  Ingestion_Update: 'Ingestion_Update',
  Ingestion_Swap_Update: 'Ingestion_Swap_Update',
  Raster_Tiles_Exporter: 'Export',
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export type JobTypes = (typeof JobTypes)[keyof typeof JobTypes];

/* eslint-disable @typescript-eslint/naming-convention */
export const TaskTypes = {
  Init: 'init',
  Finalize: 'finalize',
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export type TaskTypes = (typeof TaskTypes)[keyof typeof TaskTypes];

export const INGESTION_VALIDATIONS = {
  boundingBox: {
    pattern: '^-?(0|[1-9]\\d*)(\\.\\d*)?,-?(0|[1-9]\\d*)(\\.\\d*)?,-?(0|[1-9]\\d*)(\\.\\d*)?,-?(0|[1-9]\\d*)(\\.\\d*)?$',
    description: 'Bounding box in the format "minX,minY,maxX,maxY"',
  },
  classification: {
    pattern: '^[0-9]$|^[1-9][0-9]$|^(100)$',
    description: 'Classification value between 0 and 100',
  },
  gpkgfileName: {
    pattern: '^((\\/[\\w-]+)+)\\/([^\\/][\\wא-ת\\.-]+)\\.gpkg$',
    description: 'Valid gpkg file path, file name must end with .gpkg',
  },
  metadataShapefileFilePath: {
    // eslint-disable-next-line no-useless-escape
    pattern: '^(\\/?[\\w-]+)(\\/[\\w-]+)*\\/ShapeMetadata\\.shp$',
    description: 'Valid metadata shapefile file path, must be end with /ShapeMetadata.shp',
  },
  productShapefileFilePath: {
    // eslint-disable-next-line no-useless-escape
    pattern: '^(\\/?[\\w-]+)(\\/[\\w-]+)*\\/Product\\.shp$',
    description: 'Valid product shapefile file path, must be end with /Product.shp',
  },
  horizontalAccuracyCE90: {
    min: 0.01,
    max: 4000,
  },
  productId: {
    pattern: '^[A-Za-z]{1}[A-Za-z0-9_]{0,37}$',
    description: 'Product ID must start with a letter and contain only letters, numbers and underscores',
  },
  productVersion: {
    pattern: '^[1-9]\\d*(\\.(0|[1-9]\\d?))?$',
    description: 'Product version in the format "x.y", e.g. "1.0"',
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
  polygonPartsEntityName: {
    pattern: '^[a-z][a-z0-9_]{0,61}[a-z0-9]$',
    description:
      'Polygon parts entity name must start with a letter, end with a letter or number, and contain only lowercase letters, numbers and underscores',
  },
} satisfies ValidationRules;

/* eslint-disable @typescript-eslint/naming-convention */
export const ShapefileExtensions = {
  SHP: '.shp', // Main shapefile containing geometry data
  SHX: '.shx', // Shape index file for spatial indexing
  DBF: '.dbf', // Attribute data in dBASE format
  PRJ: '.prj', // Projection/coordinate system info
  CPG: '.cpg', // Code page file specifying character encoding
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export type ShapefileExtensions = (typeof ShapefileExtensions)[keyof typeof ShapefileExtensions];

export const SHAPEFILE_EXTENSIONS_LIST = Object.values(ShapefileExtensions);
