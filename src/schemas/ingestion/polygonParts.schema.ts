import { z } from 'zod';
import {
  featureCollectionSchema,
  featureSchema,
  multiPolygonSchema,
  polygonSchema,
  rasterProductTypeSchema,
  resourceIdSchema,
  versionSchema,
} from '../core';
import { partSchema } from '../core/polygonParts.schema';
import { ingestionJobTypeSchema } from './job.schema';
import { polygonPartsEntityPatternSchema } from './layerNameFormats.schema';

export const polygonPartsEntityNameSchema = z
  .object({
    polygonPartsEntityName: polygonPartsEntityPatternSchema,
  })
  .describe('polygonPartsEntityNameSchema');

export const polygonPartsFeatureSchema = featureSchema(polygonSchema.or(multiPolygonSchema), partSchema);

export const polygonPartsFeatureCollectionSchema = featureCollectionSchema(polygonPartsFeatureSchema);

export const polygonPartsPayloadSchema = z.object({
  jobType: ingestionJobTypeSchema,
  productType: rasterProductTypeSchema,
  catalogId: z.string().uuid({ message: 'Catalog ID should be a valid UUID' }),
  productId: resourceIdSchema,
  productVersion: versionSchema,
  partsData: polygonPartsFeatureCollectionSchema,
});
