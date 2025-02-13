import { z } from 'zod';
import { ITaskResponse, OperationStatus } from '@map-colonies/mc-priority-queue';

export const createTaskResponseSchema = <T>(parametersSchema?: z.ZodType<T>): z.ZodType<ITaskResponse<T>> => {
  return z.object({
    id: z.string().uuid(),
    jobId: z.string().uuid(),
    description: z.string(),
    parameters: parametersSchema ?? z.unknown().optional(),
    created: z.string(),
    updated: z.string(),
    type: z.string(),
    status: z.nativeEnum(OperationStatus),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    percentage: z.number().min(0).max(100).optional(),
    reason: z.string(),
    attempts: z.number().min(0),
    resettable: z.boolean(),
  }) as z.ZodType<ITaskResponse<T>>;
};

export const taskBlockDuplicationParamSchema = z
  .object({
    blockDuplication: z.boolean().optional(),
  })
  .describe('taskBlockDuplicationParamSchema');
