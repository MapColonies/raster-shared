import z from 'zod';
import { JobTypes } from '../../constants';
import { partObjectSchema, urlsArraySchema } from '../core';
import { newAdditionalParamsSchema, swapUpdateAdditionalParamsSchema, updateAdditionalParamsSchema } from './additionalParams.schema';
import { inputFilesSchema } from './inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from './layer.schema';

export const ingestionJobTypeSchema = z.enum([JobTypes.Ingestion_New, JobTypes.Ingestion_Swap_Update, JobTypes.Ingestion_Update]);

export const ingestionResolutionSchema = partObjectSchema.shape.resolutionDegree;

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
