import z from 'zod';
import { CORE_VALIDATIONS } from '../../constants';
import { callbackUrlsArraySchema } from '../core/callbackUrl.schema';
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

export const ingestionNewJobParamsSchema = z
  .object({
    metadata: newRasterLayerMetadataSchema,
    inputFiles: inputFilesSchema,
    ingestionResolution: ingestionResolutionSchema,
    callbackUrls: callbackUrlsArraySchema.optional(),
    additionalParams: newAdditionalParamsSchema,
  })
  .describe('ingestionNewJobParamsSchema');

export const ingestionUpdateJobParamsSchema = z
  .object({
    metadata: updateRasterLayerMetadataSchema,
    inputFiles: inputFilesSchema,
    ingestionResolution: ingestionResolutionSchema,
    callbackUrls: callbackUrlsArraySchema.optional(),
    additionalParams: updateAdditionalParamsSchema,
  })
  .describe('ingestionUpdateJobParamsSchema');

export const ingestionSwapUpdateJobParamsSchema = z
  .object({
    metadata: updateRasterLayerMetadataSchema,
    inputFiles: inputFilesSchema,
    ingestionResolution: ingestionResolutionSchema,
    callbackUrls: callbackUrlsArraySchema.optional(),
    additionalParams: swapUpdateAdditionalParamsSchema,
  })
  .describe('ingestionSwapUpdateParamsSchema');
