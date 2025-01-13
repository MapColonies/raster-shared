/* eslint-disable @typescript-eslint/naming-convention */
export const ArtifactType = {
  METADATA: 'METADATA', // will be removed with v2.0.0
  GPKG: 'GPKG',
} as const;

export const TileFormatStrategy = {
  FIXED: 'fixed',
  MIXED: 'mixed',
} as const;

export const SourceType = {
  S3: 'S3',
  GPKG: 'GPKG',
  FS: 'FS',
} as const;

export type ArtifactType = (typeof ArtifactType)[keyof typeof ArtifactType];
export type TileFormatStrategy = (typeof TileFormatStrategy)[keyof typeof TileFormatStrategy];
export type SourceType = (typeof SourceType)[keyof typeof SourceType];

/* eslint-disable @typescript-eslint/naming-convention */
