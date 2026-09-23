import z from 'zod';
import { tileRangeSchema } from '../../schemas/core/tile.schema';

export type TileRange = z.infer<typeof tileRangeSchema>;
