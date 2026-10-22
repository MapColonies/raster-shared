import z from 'zod';
import { fileMetadataSchema } from '../core';

//#region Validation

export const validationTaskCallbackDataSchema = z
  .object({
    isValid: z.boolean(),
    links: fileMetadataSchema.array().optional(),
  })
  .describe('validationTaskCallbackDataSchema');

//#endregion Validation
