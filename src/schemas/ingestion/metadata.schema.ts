/* eslint-disable @typescript-eslint/no-magic-numbers */
import { z } from 'zod';
import { INGESTION_VALIDATIONS } from '../../constants/ingestion/constants';
import { Transparency } from '../../constants/core/constants';
import { rasterProductTypeSchema, resourceIdSchema } from '../core';

export const baseRasterLayerMetadataSchema = z
  .object({
    classification: z.string().regex(new RegExp(INGESTION_VALIDATIONS.classification.pattern)),
  })
  .describe('baseRasterLayerMetadataSchema');

export const newRasterLayerMetadataSchema = baseRasterLayerMetadataSchema
  .extend({
    productId: resourceIdSchema,
    productName: z.string().min(1),
    productType: rasterProductTypeSchema,
    srs: z.literal('4326'),
    srsName: z.literal('WGS84GEO'),
    transparency: z.nativeEnum(Transparency),
    region: z.array(z.string().min(1)).min(1),
    producerName: z.string().optional(),
    scale: z.number().min(INGESTION_VALIDATIONS.scale.min).max(INGESTION_VALIDATIONS.scale.max).optional(),
    productSubType: z.string().optional(),
    description: z.string().optional(),
  })
  .describe('newRasterLayerMetadataSchema');

export const updateRasterLayerMetadataSchema = baseRasterLayerMetadataSchema.describe('updateRasterLayerMetadataSchema');
