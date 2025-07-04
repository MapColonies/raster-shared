import { z } from 'zod';
import { CORE_VALIDATIONS, TileOutputFormat } from '../../constants/core/constants';
import { multiPolygonSchema, polygonSchema } from '../core/geo.schema';
import { polygonPartsEntityPatternSchema } from './layerNameFormats.schema';

export const baseAdditionalParamsSchema = z
  .object({
    jobTrackerServiceURL: z.string().regex(new RegExp(CORE_VALIDATIONS.url.pattern), CORE_VALIDATIONS.url.description),
    polygonPartsEntityName: polygonPartsEntityPatternSchema.optional(),
  })
  .describe('baseAdditionalParamsSchema');

export const baseUpdateAdditionalParamsSchema = baseAdditionalParamsSchema
  .extend({
    tileOutputFormat: z.nativeEnum(TileOutputFormat),
    footprint: polygonSchema.or(multiPolygonSchema),
  })
  .describe('baseUpdateAdditionalParamsSchema');

export const newAdditionalParamsSchema = baseAdditionalParamsSchema;

export const updateAdditionalParamsSchema = baseUpdateAdditionalParamsSchema
  .extend({
    displayPath: z.string().uuid(),
  })
  .describe('updateAdditionalParamsSchema');

export const swapUpdateAdditionalParamsSchema = baseUpdateAdditionalParamsSchema.describe('swapUpdateAdditionalParamsSchema');
