import z from 'zod';
import { CORE_VALIDATIONS } from '../../constants';
import { urlsArraySchema } from '../core';
import { newAdditionalParamsSchema, swapUpdateAdditionalParamsSchema, updateAdditionalParamsSchema } from './additionalParams.schema';
import { inputFilesSchema } from './inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from './metadata.schema';

export const ingestionResolutionSchema = z
  .number({ message: 'Resolution degree should be a number' })
  .min(CORE_VALIDATIONS.resolutionDeg.min, {
    message: `Resolution degree should not be lower than ${CORE_VALIDATIONS.resolutionDeg.min}`,
  })
  .max(CORE_VALIDATIONS.resolutionDeg.max, {
    message: `Resolution degree should not be higher than ${CORE_VALIDATIONS.resolutionDeg.max}`,
  });

export const ingestionBaseJobParamsSchema = z
  .object({
    inputFiles: inputFilesSchema,
    ingestionResolution: ingestionResolutionSchema,
    callbackUrls: urlsArraySchema.optional(),
  })
  .describe('ingestionBaseJobParamsSchema');

export const ingestionNewJobParamsSchema = ingestionBaseJobParamsSchema
  .extend({
    metadata: newRasterLayerMetadataSchema,
    additionalParams: newAdditionalParamsSchema,
  })
  .describe('ingestionNewJobParamsSchema');

export const ingestionUpdateJobParamsSchema = ingestionBaseJobParamsSchema
  .extend({
    metadata: updateRasterLayerMetadataSchema,
    additionalParams: updateAdditionalParamsSchema,
  })
  .describe('ingestionUpdateJobParamsSchema');

export const ingestionSwapUpdateJobParamsSchema = ingestionBaseJobParamsSchema
  .extend({
    metadata: updateRasterLayerMetadataSchema,
    additionalParams: swapUpdateAdditionalParamsSchema,
  })
  .describe('ingestionSwapUpdateJobParamsSchema');
