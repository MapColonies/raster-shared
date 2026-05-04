import z from 'zod';
import { tileRangeSchema, tilesDeletionParamsSchema } from '../../schemas/core/tile.schema';

export type TilesDeletionParams = z.infer<typeof tilesDeletionParamsSchema>;
export type TileRange = z.infer<typeof tileRangeSchema>;
