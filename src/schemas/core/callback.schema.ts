import z from 'zod';
import { OperationStatus } from '@map-colonies/mc-priority-queue';
import { rasterProductTypeSchema, resourceIdSchema, versionSchema } from './job.schema';

export const callbackUrlSchema = z.string().url();

export const callbackUrlsArraySchema = z.array(callbackUrlSchema);

export const fileMetadataSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().nonnegative(),
  url: callbackUrlSchema,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createCallbackResponseSchema = <T>(dataSchema?: z.ZodType<T>) => {
  return z.object({
    jobId: z.string().uuid(),
    taskId: z.string().uuid(),
    jobType: z.string(),
    taskType: z.string(),
    productId: resourceIdSchema,
    productType: rasterProductTypeSchema,
    version: versionSchema,
    status: z.nativeEnum(OperationStatus),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    progress: z.number().min(0).max(100).optional(),
    message: z.string().optional(),
    error: z.string().optional(),
    data: dataSchema ?? z.unknown(),
  });
};
