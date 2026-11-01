import { z } from 'zod';
import { featureCollectionSchema, featureSchema, multiPolygonSchema, polygonSchema } from '../core';
import { productTypeSchema, resourceIdSchema, versionSchema } from '../core/layer.schema';
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
  productType: productTypeSchema,
  catalogId: z.string().uuid(),
  productId: resourceIdSchema,
  productVersion: versionSchema,
  partsData: polygonPartsFeatureCollectionSchema,
});
