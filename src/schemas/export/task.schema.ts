import { z } from 'zod';
import { TileOutputFormat } from '@map-colonies/mc-model-types';
import { TileFormatStrategy } from '../../constants/export/constants';
import { sourceSchema } from './export.schema';

//TODO: maybe TileOutputFormat move to this repo
//TODO:  ITileRange is an interface and can use it here as is, 2 options: create a validation function like so :
/*
const validateTileRange = (data: unknown): data is ITileRange => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const keys = ['minX', 'minY', 'maxX', 'maxY', 'zoom'];
  return keys.every((key) => key in data && typeof (data as any)[key] === 'number');
};
and do this 
batches: z.custom<ITileRange>(validateTileRange),

or what i did here 

*/

const tileRangeSchema = z.object({
  minX: z.number(),
  minY: z.number(),
  maxX: z.number(),
  maxY: z.number(),
  zoom: z.number(),
});

export const exportTaskParametersSchema = z.object({
  isNewTarget: z.boolean(),
  batches: z.array(tileRangeSchema),
  sources: z.array(sourceSchema),
  targetFormat: z.nativeEnum(TileOutputFormat).optional(),
  outputFormatStrategy: z.nativeEnum(TileFormatStrategy).optional(),
});
