import z, { type ZodObject, type ZodType, type ZodTypeAny } from 'zod';
import { CORE_VALIDATIONS, INGESTION_VALIDATIONS } from '../../constants';
import type { SelectivePartial } from '../../utils/typeUtils';
import { featureSchema, multiPolygonSchema, polygonSchema } from './geo.schema';

const aggregationPropertiesSchema = z
  .object({
    imagingTimeBeginUTC: z.coerce.date({ message: 'Imaging time begin UTC should be a datetime' }),
    imagingTimeEndUTC: z.coerce.date({ message: 'Imaging time end UTC should be a datetime' }),
    maxHorizontalAccuracyCE90: z
      .number({ message: 'Max horizontal accuracy CE90 should be a number' })
      .min(INGESTION_VALIDATIONS.horizontalAccuracyCE90.min, {
        message: `Max horizontal accuracy CE90 should not be less than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.min}`,
      })
      .max(INGESTION_VALIDATIONS.horizontalAccuracyCE90.max, {
        message: `Max horizontal accuracy CE90 should not be larger than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.max}`,
      }),
    maxResolutionDeg: z
      .number({ message: 'Max resolution degree should be a number' })
      .min(CORE_VALIDATIONS.resolutionDeg.min, {
        message: `Max resolution degree should not be less than ${CORE_VALIDATIONS.resolutionDeg.min}`,
      })
      .max(CORE_VALIDATIONS.resolutionDeg.max, {
        message: `Max resolution degree should not be larger than ${CORE_VALIDATIONS.resolutionDeg.max}`,
      }),
    maxResolutionMeter: z
      .number({ message: 'Max resolution meter should be a number' })
      .min(INGESTION_VALIDATIONS.resolutionMeter.min, {
        message: `Max resolution meter should not be less than ${INGESTION_VALIDATIONS.resolutionMeter.min}`,
      })
      .max(INGESTION_VALIDATIONS.resolutionMeter.max, {
        message: `Max resolution meter should not be larger than ${INGESTION_VALIDATIONS.resolutionMeter.max}`,
      }),
    minHorizontalAccuracyCE90: z
      .number({ message: 'Min horizontal accuracy CE90 should be a number' })
      .min(INGESTION_VALIDATIONS.horizontalAccuracyCE90.min, {
        message: `Min horizontal accuracy CE90 should not be less than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.min}`,
      })
      .max(INGESTION_VALIDATIONS.horizontalAccuracyCE90.max, {
        message: `Min horizontal accuracy CE90 should not be larger than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.max}`,
      }),
    minResolutionDeg: z
      .number({ message: 'Min resolution degree should be a number' })
      .min(CORE_VALIDATIONS.resolutionDeg.min, {
        message: `Min resolution degree should not be less than ${CORE_VALIDATIONS.resolutionDeg.min}`,
      })
      .max(CORE_VALIDATIONS.resolutionDeg.max, {
        message: `Min resolution degree should not be larger than ${CORE_VALIDATIONS.resolutionDeg.max}`,
      }),
    minResolutionMeter: z
      .number({ message: 'Min resolution meter should be a number' })
      .min(INGESTION_VALIDATIONS.resolutionMeter.min, {
        message: `Min resolution meter should not be less than ${INGESTION_VALIDATIONS.resolutionMeter.min}`,
      })
      .max(INGESTION_VALIDATIONS.resolutionMeter.max, {
        message: `Min resolution meter should not be larger than ${INGESTION_VALIDATIONS.resolutionMeter.max}`,
      }),
    productBoundingBox: z
      .string({ message: 'Product bounding box should be a string' })
      .regex(new RegExp(INGESTION_VALIDATIONS.boundingBox.pattern), {
        message: 'Product bounding box must be of the shape min_x,min_y,max_x,max_y',
      }),
    sensors: z
      .array(
        z.string({ message: 'Sensors should be an array of strings' }).regex(new RegExp(INGESTION_VALIDATIONS.sensor.pattern), {
          message: 'Sensors should be an array with items not starting or ending with whitespace characters',
        }),
        { message: 'Sensors should be an array' }
      )
      .min(1, { message: 'Sensors should have an array length of at least 1' }),
  })
  .strict();

type SpatialAggregationProperties = 'productBoundingBox' | 'sensors';
type AggregationProperties = SelectivePartial<z.infer<typeof aggregationPropertiesSchema>, SpatialAggregationProperties>;
type AggregationPropertiesZodSchemas = SelectivePartial<(typeof aggregationPropertiesSchema)['shape'], SpatialAggregationProperties>;

const aggregationFeaturePropertiesSchemaBuilder = <T extends AggregationProperties>(
  input: ZodObject<AggregationPropertiesZodSchemas, 'strict', ZodTypeAny, T, T>
): ZodType<T> => {
  return input
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
    .refine(
      (aggregationLayerMetadata): aggregationLayerMetadata is T =>
        aggregationLayerMetadata.maxResolutionMeter <= aggregationLayerMetadata.minResolutionMeter,
      {
        message: 'Max resolution meter should be less than or equal to min resolution meter',
      }
    );
};

export const aggregationSpatialFeaturePropertiesSchema = aggregationFeaturePropertiesSchemaBuilder(aggregationPropertiesSchema).describe(
  'aggregationSpatialFeaturePropertiesSchema'
);

export const aggregationNonSpatialFeaturePropertiesSchema = aggregationFeaturePropertiesSchemaBuilder(
  aggregationPropertiesSchema.omit({ productBoundingBox: true })
).describe('aggregationNonSpatialFeaturePropertiesSchema');

export const aggregationSpatialFeatureSchema = featureSchema(
  polygonSchema.or(multiPolygonSchema),
  aggregationSpatialFeaturePropertiesSchema
).describe('aggregationSpatialFeatureSchema');

export const aggregationNonSpatialFeatureSchema = featureSchema(z.null(), aggregationNonSpatialFeaturePropertiesSchema).describe(
  'aggregationNonSpatialFeatureSchema'
);

export const aggregationEmptyFeatureSchema = featureSchema(z.null(), z.null()).describe('aggregationEmptyFeatureSchema');

export const aggregationFeatureSchema = aggregationSpatialFeatureSchema
  .or(aggregationNonSpatialFeatureSchema)
  .or(aggregationEmptyFeatureSchema)
  .describe('aggregationFeatureSchema');
