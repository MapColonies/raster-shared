import z from 'zod';

export const exportFinalizeTaskParamsSchema = z
  .object({
    gpkgModified: z.boolean(),
    gpkgUploadedToS3: z.boolean().optional(),
    callbacksSent: z.boolean(),
  })
  .describe('exportFinalizeTaskParamsSchema');
