import { OperationStatus } from '@map-colonies/mc-priority-queue';
import z from 'zod';

export const exportFinalizeTaskParamsSchema = z
  .discriminatedUnion('status', [
    // Schema when status is Failed
    z.object({
      status: z.literal(OperationStatus.FAILED),
      callbacksSent: z.boolean(),
    }),
    // Schema when status is Completed
    z.object({
      status: z.literal(OperationStatus.COMPLETED),
      gpkgModified: z.boolean(),
      gpkgUploadedToS3: z.boolean(),
      callbacksSent: z.boolean(),
    }),
  ])
  .describe('exportFinalizeTaskParamsSchema');
