import z from 'zod';
import { checksumSchema } from '../core';
import { validationReportSchema } from './validationTask.schema';

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
    checksums: z.array(checksumSchema),
    isValid: z.boolean().optional(),
    report: validationReportSchema.optional(),
  })
  .describe('ingestionValidationTaskParamsSchema');
