import { z } from 'zod';
import { MAX_ZOOM_LEVEL, SourceType, TileOutputFormat } from '../../constants';

export const tileRangeSchema = z.object({
  zoom: z.number().int().min(0).max(MAX_ZOOM_LEVEL),
  minX: z.number().int().min(0),
  maxX: z.number().int().min(0),
  minY: z.number().int().min(0),
  maxY: z.number().int().min(0),
});

export const tilesDeletionParamsBaseSchema = z.object({
  tilesPath: z.string().min(1), // Base path for the tiles to be deleted
  ranges: z.array(tileRangeSchema).min(1), // Array of tile ranges to be deleted
  fileExtension: z.literal(TileOutputFormat.PNG.toLowerCase()).or(z.literal(TileOutputFormat.JPEG.toLowerCase())), // File extension of the tiles (e.g., 'png', 'jpeg')
});

export const s3TilesDeletionParamsSchema = tilesDeletionParamsBaseSchema.extend({
  sourceProvider: z.literal(SourceType.S3),
});

export const fsTilesDeletionParamsSchema = tilesDeletionParamsBaseSchema.extend({
  sourceProvider: z.literal(SourceType.FS),
});

export const tilesDeletionParamsSchema = z.discriminatedUnion('sourceProvider', [s3TilesDeletionParamsSchema, fsTilesDeletionParamsSchema]);
