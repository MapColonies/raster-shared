import z from 'zod';
import { featureSchema, multiPolygonSchema, polygonSchema } from './geo.schema';
import { revisionObjectSchema } from './layer.schema';

export const aggregationFeaturePropertiesSchema = revisionObjectSchema
  .pick({
    imagingTimeBeginUTC: true,
    imagingTimeEndUTC: true,
    maxHorizontalAccuracyCE90: true,
    maxResolutionDeg: true,
    maxResolutionMeter: true,
    minHorizontalAccuracyCE90: true,
    minResolutionDeg: true,
    minResolutionMeter: true,
    sensors: true,
  })
  .strict()
  .refine(
    (aggregationLayerMetadata) =>
      aggregationLayerMetadata.imagingTimeBeginUTC <= aggregationLayerMetadata.imagingTimeEndUTC &&
      aggregationLayerMetadata.imagingTimeEndUTC <= new Date(),
    {
      message: 'Imaging time begin UTC should be less than or equal to imaging time end UTC and both less than or equal to current timestamp',
    }
  )
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.maxHorizontalAccuracyCE90 <= aggregationLayerMetadata.minHorizontalAccuracyCE90, {
    message: 'Max horizontal accuracy CE90 should be less than or equal to min horizontal accuracy CE90',
  })
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.maxResolutionDeg <= aggregationLayerMetadata.minResolutionDeg, {
    message: 'Max resolution degree should be less than or equal to min resolution degree',
  })
  .refine((aggregationLayerMetadata) => aggregationLayerMetadata.maxResolutionMeter <= aggregationLayerMetadata.minResolutionMeter, {
    message: 'Max resolution meter should be less than or equal to min resolution meter',
  })
  .describe('aggregationLayerMetadataSchema')
  .describe('aggregationFeaturePropertiesSchema');

export const aggregationFeatureSchema = featureSchema(
  polygonSchema.or(multiPolygonSchema).or(z.null()),
  aggregationFeaturePropertiesSchema.or(z.null())
).describe('aggregationFeatureSchema');
