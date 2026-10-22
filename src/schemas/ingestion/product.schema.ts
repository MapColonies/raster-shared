import z from 'zod';
import { featureSchema, multiPolygonSchema, polygonSchema } from '../core';

export const productFeatureSchema = featureSchema(z.union([polygonSchema, multiPolygonSchema]), z.object({}).passthrough())
  .array()
  .length(1, 'product shapefile must contain a single feature')
  .transform((features) => features[0]);
