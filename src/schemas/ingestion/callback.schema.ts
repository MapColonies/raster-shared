import z from 'zod';
import { fileMetadataSchema } from '../core';

//#region Validation

export const validationCallbackDataSchema = z
  .object({
    isValid: z.boolean(),
    sourceName: z.string(),
    links: fileMetadataSchema.array().optional(),
  })
  .describe('validationCallbackDataSchema');

//#endregion Validation
