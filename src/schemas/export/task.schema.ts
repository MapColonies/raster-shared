import { OperationStatus } from '@map-colonies/mc-priority-queue';
import z from 'zod';

export const exportFinalizeTaskParamsSchema = z
  .object({
    gpkgModified: z.boolean().optional(),
    gpkgUploadedToS3: z.boolean().optional(),
    callbacksSent: z.boolean(),
    status: z.nativeEnum(OperationStatus).optional(),
    errorReason: z.string().optional(),
  })
  .describe('exportFinalizeTaskParamsSchema')
  .refine(
    (data) => !(data.status && !data.errorReason), // Simplified logic: return false if status is set without errorReason
    {
      message: 'errorReason is required when status is provided',
      path: ['errorReason'],
    }
  );
