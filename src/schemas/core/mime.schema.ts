import { TilesMimeFormat } from '@map-colonies/types';
import { z, ZodType } from 'zod';

export const tilesMimeFormatSchema: ZodType<TilesMimeFormat> = z.literal('image/png').or(z.literal('image/jpeg'));
