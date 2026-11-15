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
  gpkgfileName: {
    pattern: '^(\\/?[\\w-]+)(\\/[\\w-]+)*\\/[\\wא-ת\\.-]+\\.gpkg$',
    description: 'Valid gpkg file path, file name must end with .gpkg',
  },
  metadataShapefilePath: {
    pattern: '^(\\/?[\\w-]+)(\\/[\\w-]+)*\\/ShapeMetadata\\.shp$',
    description: 'Valid metadata shapefile file path, must be end with /ShapeMetadata.shp',
  },
  productShapefilePath: {
    pattern: '^(\\/?[\\w-]+)(\\/[\\w-]+)*\\/Product\\.shp$',
    description: 'Valid product shapefile file path, must be end with /Product.shp',
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

/* eslint-disable @typescript-eslint/naming-convention */
export const ValidationErrorType = {
  GEOMETRY_VALIDITY: 'Geometry_Validity',
  VERTICES: 'Vertices',
  METADATA: 'Metadata',
  SMALL_GEOMETRY: 'Small_Geometry',
  SMALL_HOLES: 'Small_Holes',
  RESOLUTION: 'Resolution',
  UNKNOWN: 'Unknown',
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export type ValidationErrorType = (typeof ValidationErrorType)[keyof typeof ValidationErrorType];
