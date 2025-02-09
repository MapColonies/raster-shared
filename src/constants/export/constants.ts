import { ArtifactRasterType } from '@map-colonies/types';
import { pickEnum } from '../../utils';

/* eslint-disable @typescript-eslint/naming-convention */
export const ExportArtifactType = pickEnum(ArtifactRasterType, ['GPKG', 'METADATA']);

export const TileFormatStrategy = {
  FIXED: 'fixed',
  MIXED: 'mixed',
} as const;

export const SourceType = {
  S3: 'S3',
  GPKG: 'GPKG',
  FS: 'FS',
} as const;

export type TileFormatStrategy = (typeof TileFormatStrategy)[keyof typeof TileFormatStrategy];
export type SourceType = (typeof SourceType)[keyof typeof SourceType];

/* eslint-disable @typescript-eslint/naming-convention */
