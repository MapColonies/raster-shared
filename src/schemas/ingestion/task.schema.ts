import z from 'zod';
import { fileMetadataSchema } from '../core';

export const ingestionNewFinalizeTaskParamsSchema = z
  .object({
    insertedToMapproxy: z.boolean(),
    insertedToCatalog: z.boolean(),
    insertedToGeoServer: z.boolean(),
  })
  .describe('ingestionNewFinalizeTaskParamsSchema');

export const ingestionUpdateFinalizeTaskParamsSchema = z
  .object({
    updatedInCatalog: z.boolean(),
  })
  .describe('ingestionUpdateFinalizeTaskParamsSchema');

export const ingestionSwapUpdateTaskParamsSchema = ingestionUpdateFinalizeTaskParamsSchema
  .extend({
    updatedInMapproxy: z.boolean(),
  })
  .describe('ingestionSwapUpdateTaskParamsSchema');

export const ingestionValidationTaskParamsSchema = z
  .object({
    link: fileMetadataSchema.optional(),
    isValid: z.boolean(),
  })
  .describe('ingestionValidationTaskParamsSchema');
