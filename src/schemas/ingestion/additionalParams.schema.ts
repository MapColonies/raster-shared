import { z } from 'zod';
import { CORE_VALIDATIONS, TileOutputFormat } from '../../constants/core/constants';

export const baseAdditionalParamsSchema = z
  .object({
    jobTrackerServiceURL: z.string().regex(new RegExp(CORE_VALIDATIONS.url.pattern), { message: 'URL must start with http:// or https://' }),
  })
  .describe('baseAdditionalParamsSchema');

export const baseUpdateAdditionalParamsSchema = baseAdditionalParamsSchema
  .extend({
    tileOutputFormat: z.nativeEnum(TileOutputFormat),
  })
  .describe('baseUpdateAdditionalParamsSchema');

export const newAdditionalParamsSchema = baseAdditionalParamsSchema;

export const updateAdditionalParamsSchema = baseUpdateAdditionalParamsSchema
  .extend({
    displayPath: z.string().uuid(),
  })
  .describe('updateAdditionalParamsSchema');

export const swapUpdateAdditionalParamsSchema = baseUpdateAdditionalParamsSchema.describe('swapUpdateAdditionalParamsSchema');
