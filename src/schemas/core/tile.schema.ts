import { z } from 'zod';
import { MAX_ZOOM_LEVEL, TileOutputFormat } from '../../constants/core/constants';

export const tileRangeSchema = z.object({
  zoom: z.number().int().min(0).max(MAX_ZOOM_LEVEL),
  minX: z.number().int().min(0),
  maxX: z.number().int().min(0),
  minY: z.number().int().min(0),
  maxY: z.number().int().min(0),
});

export const tileRangesSchema = z.object({
  ranges: z.array(tileRangeSchema).min(1), // Array of tile ranges to be deleted
});

/** Fields that only make sense for path-based tile stores. */
export const tilePyramidSchema = z.object({
  tilesPath: z.string().min(1), // Base path for the tiles to be deleted
  fileExtension: z.literal(TileOutputFormat.PNG.toLowerCase()).or(z.literal(TileOutputFormat.JPEG.toLowerCase())), // e.g. 'png', 'jpeg'
});
