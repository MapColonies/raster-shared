import { RecordStatus, RecordType } from '@map-colonies/types';
import { z, type ZodType } from 'zod';
import { CORE_VALIDATIONS, INGESTION_VALIDATIONS, RasterProductTypes, TileOutputFormat, Transparency } from '../../constants';
import { multiPolygonSchema, polygonSchema } from './geo.schema';
import { tilesMimeFormatSchema } from './mime.schema';

export const productTypeSchema: ZodType<RasterProductTypes> = z.nativeEnum(RasterProductTypes);
export const resourceIdSchema = z
  .string()
  .regex(new RegExp(INGESTION_VALIDATIONS.productId.pattern), {
    message: 'Product ID must start with a letter and contain only letters, numbers and underscores',
  })
  .describe(INGESTION_VALIDATIONS.productId.description);
export const versionSchema = z
  .string()
  .regex(new RegExp(INGESTION_VALIDATIONS.productVersion.pattern), { message: 'Product version in the format "x.y", e.g. "1.0"' })
  .describe(INGESTION_VALIDATIONS.productVersion.description);

export const layerSchema = z.object({
  id: z.string().uuid(),
  productId: resourceIdSchema,
  productType: productTypeSchema,
});

export const rasterLayerCatalogSchema = z
  .object({
    metadata: z
      .object({
        id: z.string().uuid(),
        srs: z.literal('4326'),
        productVersion: versionSchema,
        maxResolutionDeg: z
          .number({ message: 'Max resolution degree should be a number' })
          .min(CORE_VALIDATIONS.resolutionDeg.min, {
            message: `Max resolution degree should not be less than ${CORE_VALIDATIONS.resolutionDeg.min}`,
          })
          .max(CORE_VALIDATIONS.resolutionDeg.max, {
            message: `Max resolution degree should not be larger than ${CORE_VALIDATIONS.resolutionDeg.max}`,
          }),
        minResolutionDeg: z
          .number({ message: 'Min resolution degree should be a number' })
          .min(CORE_VALIDATIONS.resolutionDeg.min, {
            message: `Min resolution degree should not be less than ${CORE_VALIDATIONS.resolutionDeg.min}`,
          })
          .max(CORE_VALIDATIONS.resolutionDeg.max, {
            message: `Min resolution degree should not be larger than ${CORE_VALIDATIONS.resolutionDeg.max}`,
          }),
        scale: z.number().min(INGESTION_VALIDATIONS.scale.min).max(INGESTION_VALIDATIONS.scale.max).optional(),
        creationDateUTC: z.coerce.date(),
        ingestionDate: z.coerce.date(),
        minHorizontalAccuracyCE90: z
          .number({ message: 'Min horizontal accuracy CE90 should be a number' })
          .min(INGESTION_VALIDATIONS.horizontalAccuracyCE90.min, {
            message: `Min horizontal accuracy CE90 should not be less than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.min}`,
          })
          .max(INGESTION_VALIDATIONS.horizontalAccuracyCE90.max, {
            message: `Min horizontal accuracy CE90 should not be larger than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.max}`,
          })
          .optional(),
        maxHorizontalAccuracyCE90: z
          .number({ message: 'Max horizontal accuracy CE90 should be a number' })
          .min(INGESTION_VALIDATIONS.horizontalAccuracyCE90.min, {
            message: `Max horizontal accuracy CE90 should not be less than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.min}`,
          })
          .max(INGESTION_VALIDATIONS.horizontalAccuracyCE90.max, {
            message: `Max horizontal accuracy CE90 should not be larger than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.max}`,
          }),
        region: z.array(z.string().min(1)).min(1),
        sensors: z
          .array(
            z.string({ message: 'Sensors should be an array of strings' }).regex(new RegExp(INGESTION_VALIDATIONS.sensor.pattern), {
              message: 'Sensors should be an array with items not starting or ending with whitespace characters',
            }),
            { message: 'Sensors should be an array' }
          )
          .min(1, { message: 'Sensors should have an array length of at least 1' }),
        imagingTimeBeginUTC: z.coerce.date({ message: 'Imaging time begin UTC should be a datetime' }),
        imagingTimeEndUTC: z.coerce.date({ message: 'Imaging time end UTC should be a datetime' }),
        updateDateUTC: z.coerce.date(),
        maxResolutionMeter: z
          .number({ message: 'Max resolution meter should be a number' })
          .min(INGESTION_VALIDATIONS.resolutionMeter.min, {
            message: `Max resolution meter should not be less than ${INGESTION_VALIDATIONS.resolutionMeter.min}`,
          })
          .max(INGESTION_VALIDATIONS.resolutionMeter.max, {
            message: `Max resolution meter should not be larger than ${INGESTION_VALIDATIONS.resolutionMeter.max}`,
          }),
        minResolutionMeter: z
          .number({ message: 'Min resolution meter should be a number' })
          .min(INGESTION_VALIDATIONS.resolutionMeter.min, {
            message: `Min resolution meter should not be less than ${INGESTION_VALIDATIONS.resolutionMeter.min}`,
          })
          .max(INGESTION_VALIDATIONS.resolutionMeter.max, {
            message: `Min resolution meter should not be larger than ${INGESTION_VALIDATIONS.resolutionMeter.max}`,
          }),
        productSubType: z.string().optional(),
        productBoundingBox: z
          .string({ message: 'Product bounding box should be a string' })
          .regex(new RegExp(INGESTION_VALIDATIONS.boundingBox.pattern), {
            message: 'Product bounding box must be of the shape min_x,min_y,max_x,max_y',
          })
          .optional(),
        displayPath: z.string().uuid(),
        transparency: z.nativeEnum(Transparency),
        tileMimeFormat: tilesMimeFormatSchema,
        tileOutputFormat: z.nativeEnum(TileOutputFormat),
        productStatus: z.nativeEnum(RecordStatus),
        type: z.literal(RecordType.RECORD_RASTER),
        classification: z
          .string()
          .regex(new RegExp(INGESTION_VALIDATIONS.classification.pattern), { message: 'Classification value must be between 0 and 100' }),
        productName: z.string().optional(),
        description: z.string().optional(),
        srsName: z.literal('WGS84GEO'),
        producerName: z.string().optional(),
        footprint: polygonSchema.or(multiPolygonSchema),
        productId: resourceIdSchema,
        productType: productTypeSchema,
      })
      .strict()
      .refine(
        (rasterLayerMetadata) =>
          rasterLayerMetadata.imagingTimeBeginUTC <= rasterLayerMetadata.imagingTimeEndUTC && rasterLayerMetadata.imagingTimeEndUTC <= new Date(),
        {
          message: 'Imaging time begin UTC should be less than or equal to imaging time end UTC and both less than or equal to current timestamp',
        }
      )
      .refine(
        (rasterLayerMetadata) =>
          rasterLayerMetadata.minHorizontalAccuracyCE90 !== undefined
            ? rasterLayerMetadata.maxHorizontalAccuracyCE90 <= rasterLayerMetadata.minHorizontalAccuracyCE90
            : true,
        {
          message: 'Max horizontal accuracy CE90 should be less than or equal to min horizontal accuracy CE90',
        }
      )
      .refine((rasterLayerMetadata) => rasterLayerMetadata.maxResolutionDeg <= rasterLayerMetadata.minResolutionDeg, {
        message: 'Max resolution degree should be less than or equal to min resolution degree',
      })
      .refine((rasterLayerMetadata) => rasterLayerMetadata.maxResolutionMeter <= rasterLayerMetadata.minResolutionMeter, {
        message: 'Max resolution meter should be less than or equal to min resolution meter',
      }),
    links: z
      .array(
        z
          .object({
            protocol: z.string(),
            url: z.string().url(),
            name: z.string().optional(),
            description: z.string().optional(),
          })
          .strict()
      )
      .optional(),
  })
  .strict()
  .describe('rasterLayerCatalogSchema');
