/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { Polygon } from 'geojson';
import { z } from 'zod';
import { CORE_VALIDATIONS } from '../../constants';
import { INGESTION_VALIDATIONS } from '../../constants/ingestion/constants';
import { rasterProductTypeSchema, resourceIdSchema, versionSchema } from '../core';
import { polygonPartsEntityPatternSchema } from './layerNameFormats.schema';

export const partSchema = z
  .object({
    sourceId: z.string({ message: 'Source id should be a string' }).optional(),
    sourceName: z.string({ message: 'Source name should be a string' }).min(1, { message: 'Source name should have length of at least 1' }),
    description: z.string({ message: 'Description should be a string' }).optional(),
    imagingTimeBeginUTC: z.coerce.date({ message: 'Imaging time begin UTC should be a datetime' }),
    imagingTimeEndUTC: z.coerce.date({ message: 'Imaging time end UTC should be a datetime' }),
    resolutionDegree: z
      .number({ message: 'Resolution degree should be a number' })
      .min(CORE_VALIDATIONS.resolutionDeg.min, {
        message: `Resolution degree should not be less than ${CORE_VALIDATIONS.resolutionDeg.min}`,
      })
      .max(CORE_VALIDATIONS.resolutionDeg.max, {
        message: `Resolution degree should not be larger than ${CORE_VALIDATIONS.resolutionDeg.max}`,
      }),
    resolutionMeter: z
      .number({ message: 'Resolution meter should be a number' })
      .min(INGESTION_VALIDATIONS.resolutionMeter.min, {
        message: `Resolution meter should not be less than ${INGESTION_VALIDATIONS.resolutionMeter.min}`,
      })
      .max(INGESTION_VALIDATIONS.resolutionMeter.max, {
        message: `Resolution meter should not be larger than ${INGESTION_VALIDATIONS.resolutionMeter.max}`,
      }),
    sourceResolutionMeter: z
      .number({ message: 'Source resolution meter should be a number' })
      .min(INGESTION_VALIDATIONS.resolutionMeter.min, {
        message: `Source resolution meter should not be less than ${INGESTION_VALIDATIONS.resolutionMeter.min}`,
      })
      .max(INGESTION_VALIDATIONS.resolutionMeter.max, {
        message: `Source resolution meter should not be larger than ${INGESTION_VALIDATIONS.resolutionMeter.max}`,
      }),
    horizontalAccuracyCE90: z
      .number({ message: 'Horizontal accuracy CE90 should be a number' })
      .min(INGESTION_VALIDATIONS.horizontalAccuracyCE90.min, {
        message: `Horizontal accuracy CE90 should not be less than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.min}`,
      })
      .max(INGESTION_VALIDATIONS.horizontalAccuracyCE90.max, {
        message: `Horizontal accuracy CE90 should not be larger than ${INGESTION_VALIDATIONS.horizontalAccuracyCE90.max}`,
      }),
    sensors: z
      .array(
        z.string({ message: 'Sensors should be an array of strings' }).regex(new RegExp(INGESTION_VALIDATIONS.sensor.pattern), {
          message: 'Sensors should be an array with items not starting or ending with whitespace characters',
        }),
        { message: 'Sensors should be an array' }
      )
      .min(1, { message: 'Sensors should have an array length of at least 1' }),
    countries: z
      .array(z.string({ message: 'Countries should be an array of strings' }).min(1, { message: 'Countries should have length of at least 1' }), {
        message: 'Countries should be an array',
      })
      .optional(),
    cities: z
      .array(z.string({ message: 'Cities should be an array of strings' }).min(1, { message: 'Cities should have length of at least 1' }), {
        message: 'Cities should be an array',
      })
      .optional(),
    footprint: z.custom<Polygon>(),
  })
  .refine((part) => part.imagingTimeBeginUTC <= part.imagingTimeEndUTC && part.imagingTimeEndUTC <= new Date(), {
    message: 'Imaging time begin UTC should be less than or equal to imaging time end UTC and both less than or equal to current timestamp',
  })
  .describe('partSchema');

export const partsSchema = z.array(partSchema).describe('partsSchema');

export const polygonPartsEntityNameSchema = z
  .object({
    polygonPartsEntityName: polygonPartsEntityPatternSchema,
  })
  .describe('polygonPartsEntityNameSchema');

export const polygonPartsPayloadSchema = z.object({
  productType: rasterProductTypeSchema,
  productId: resourceIdSchema,
  catalogId: z.string().uuid(),
  productVersion: versionSchema,
  partsData: partSchema.array().min(1),
});
