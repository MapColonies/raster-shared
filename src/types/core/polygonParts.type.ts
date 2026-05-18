import { z } from 'zod';
import type {
  intersectionFeaturePropertiesSchema,
  intersectionFeatureGeometrySchema,
  intersectionFeatureSchema,
  intersectionFeatureCollectionSchema,
  intersectedFeaturePropertiesSchema,
  intersectedFeatureGeometrySchema,
  intersectedFeatureSchema,
  intersectedFeatureCollectionSchema,
} from '../../schemas/core/polygonParts.schema';

export type IntersectionFeatureProperties = z.infer<typeof intersectionFeaturePropertiesSchema>;
export type IntersectionFeatureGeometry = z.infer<typeof intersectionFeatureGeometrySchema>;
export type IntersectionFeature = z.infer<typeof intersectionFeatureSchema>;
export type IntersectionFeatureCollection = z.infer<typeof intersectionFeatureCollectionSchema>;
export type IntersectedFeatureProperties = z.infer<typeof intersectedFeaturePropertiesSchema>;
export type IntersectedFeatureGeometry = z.infer<typeof intersectedFeatureGeometrySchema>;
export type IntersectedFeature = z.infer<typeof intersectedFeatureSchema>;
export type IntersectedFeatureCollection = z.infer<typeof intersectedFeatureCollectionSchema>;
