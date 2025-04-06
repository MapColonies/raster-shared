import { IMetadataCommonModel, RecordStatus, TilesMimeFormat } from '@map-colonies/types';
import { TileOutputFormat, Transparency } from '../../constants/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RasterLayerMetadata = {
  id: string;
  srs: string;
  productVersion: string;
  maxResolutionDeg: number;
  minResolutionDeg: number;
  rms?: number;
  scale?: number;
  creationDateUTC?: Date;
  ingestionDate?: Date;
  minHorizontalAccuracyCE90: number;
  maxHorizontalAccuracyCE90: number;
  region: string[];
  sensors: string[];
  imagingTimeBeginUTC: Date;
  imagingTimeEndUTC: Date;
  updateDateUTC?: Date;
  maxResolutionMeter: number;
  minResolutionMeter: number;
  productSubType?: string;
  productBoundingBox?: string;
  displayPath: string;
  transparency: Transparency;
  tileMimeFormat: TilesMimeFormat;
  tileOutputFormat: TileOutputFormat;
  productStatus: RecordStatus;
} & IMetadataCommonModel;
