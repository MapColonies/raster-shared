import { z } from 'zod';
import { CORE_VALIDATIONS, INGESTION_VALIDATIONS } from '../../constants';
import { featureCollectionSchema, featureSchema, multiPolygonSchema, polygonSchema } from './geo.schema';

const polygonalGeometrySchema = polygonSchema.or(multiPolygonSchema).describe('polygonalGeometrySchema');

export const partObjectSchema = z
  .object({
    id: z.string(),
    sourceId: z.string().optional(),
    sourceName: z.string().min(1),
    description: z.string().optional(),
    imagingTimeBeginUTC: z.coerce.date(),
    imagingTimeEndUTC: z.coerce.date(),
    resolutionDegree: z.number().min(CORE_VALIDATIONS.resolutionDeg.min).max(CORE_VALIDATIONS.resolutionDeg.max),
    resolutionMeter: z.number().min(INGESTION_VALIDATIONS.resolutionMeter.min).max(INGESTION_VALIDATIONS.resolutionMeter.max),
    sourceResolutionMeter: z.number().min(INGESTION_VALIDATIONS.resolutionMeter.min).max(INGESTION_VALIDATIONS.resolutionMeter.max),
    horizontalAccuracyCE90: z.number().min(INGESTION_VALIDATIONS.horizontalAccuracyCE90.min).max(INGESTION_VALIDATIONS.horizontalAccuracyCE90.max),
    sensors: z.array(z.string().regex(new RegExp(INGESTION_VALIDATIONS.sensor.pattern))).min(1),
    countries: z.array(z.string().min(1)).optional(),
    cities: z.array(z.string().min(1)).optional(),
  })
  .strict();

export const partSchema = partObjectSchema
  .refine((part) => part.imagingTimeBeginUTC <= part.imagingTimeEndUTC && part.imagingTimeEndUTC <= new Date(), {
    message: 'Imaging time begin UTC should be less than or equal to imaging time end UTC and both less than or equal to current timestamp',
  })
  .describe('partSchema');
export const partsSchema = z.array(partSchema).describe('partsSchema');

//#region intersection
export const intersectionFeaturePropertiesSchema = partSchema
  .sourceType()
  .pick({ resolutionDegree: true })
  .describe('intersectionFeaturePropertiesSchema');
export const intersectionFeatureGeometrySchema = polygonalGeometrySchema.describe('intersectionFeatureGeometrySchema');
export const intersectionFeatureSchema = featureSchema(intersectionFeatureGeometrySchema, intersectionFeaturePropertiesSchema).describe(
  'intersectionFeatureGeometrySchema'
);
export const intersectionFeatureCollectionSchema = featureCollectionSchema(intersectionFeatureSchema)
  .and(z.object({ features: intersectionFeatureSchema.array().length(1) }))
  .describe('intersectionFeatureCollectionSchema');

export const intersectedFeaturePropertiesSchema = z.object({}).strict().describe('intersectedFeaturePropertiesSchema');
export const intersectedFeatureGeometrySchema = polygonalGeometrySchema.describe('intersectedFeatureGeometrySchema');
export const intersectedFeatureSchema = featureSchema(intersectedFeatureGeometrySchema, intersectedFeaturePropertiesSchema).describe(
  'intersectedFeatureSchema'
);
export const intersectedFeatureCollectionSchema = featureCollectionSchema(intersectedFeatureSchema).describe('intersectedFeatureCollectionSchema');
//#endregion
