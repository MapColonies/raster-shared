import z from 'zod';
import { callbackUrlsArraySchema } from '../core/callbackUrl.schema';
import { newAdditionalParamsSchema, swapUpdateAdditionalParamsSchema, updateAdditionalParamsSchema } from './additionalParams.schema';
import { inputFilesSchema } from './inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from './metadata.schema';

export const ingestionNewJobParamsSchema = z
  .object({
    metadata: newRasterLayerMetadataSchema,
    inputFiles: inputFilesSchema,
    callbackUrls: callbackUrlsArraySchema.optional(),
    additionalParams: newAdditionalParamsSchema,
  })
  .describe('ingestionNewJobParamsSchema');

export const ingestionUpdateJobParamsSchema = z
  .object({
    metadata: updateRasterLayerMetadataSchema,
    inputFiles: inputFilesSchema,
    callbackUrls: callbackUrlsArraySchema.optional(),
    additionalParams: updateAdditionalParamsSchema,
  })
  .describe('ingestionUpdateJobParamsSchema');

export const ingestionSwapUpdateJobParamsSchema = z
  .object({
    metadata: updateRasterLayerMetadataSchema,
    inputFiles: inputFilesSchema,
    callbackUrls: callbackUrlsArraySchema.optional(),
    additionalParams: swapUpdateAdditionalParamsSchema,
  })
  .describe('ingestionSwapUpdateParamsSchema');
