import { z } from 'zod';
import { CORE_VALIDATIONS } from '../../constants/core/constants';
import { tilesetSchema } from '../core';

export const baseAdditionalParamsSchema = z
  .object({
    jobTrackerServiceURL: z.string().regex(new RegExp(CORE_VALIDATIONS.url.pattern), { message: 'URL must start with http:// or https://' }),
  })
  .describe('baseAdditionalParamsSchema');

export const baseUpdateAdditionalParamsSchema = baseAdditionalParamsSchema
  .merge(tilesetSchema.pick({ tileOutputFormat: true }))
  .describe('baseUpdateAdditionalParamsSchema');

export const newAdditionalParamsSchema = baseAdditionalParamsSchema;

export const updateAdditionalParamsSchema = baseUpdateAdditionalParamsSchema
  .merge(tilesetSchema.pick({ displayPath: true }))
  .describe('updateAdditionalParamsSchema');

export const swapUpdateAdditionalParamsSchema = baseUpdateAdditionalParamsSchema.describe('swapUpdateAdditionalParamsSchema');
