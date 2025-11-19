import z from 'zod';
import { fileMetadataSchema } from '../core';

//#region Validation

export const validationTaskCallbackDataSchema = z
  .object({
    isValid: z.boolean(),
    sourceName: z.string().min(1),
    links: fileMetadataSchema.array().optional(),
  })
  .describe('validationTaskCallbackDataSchema');

//#endregion Validation
