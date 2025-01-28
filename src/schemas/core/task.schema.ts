import { z } from 'zod';
import { ITaskResponse, OperationStatus } from '@map-colonies/mc-priority-queue';

export const createTaskResponseSchema = <T>(parametersSchema?: z.ZodType<T>): z.ZodType<ITaskResponse<T>> => {
  return z.object({
    id: z.string(),
    jobId: z.string(),
    description: z.string(),
    parameters: parametersSchema ?? z.unknown().optional(),
    created: z.string(),
    updated: z.string(),
    type: z.string(),
    status: z.nativeEnum(OperationStatus),
    percentage: z.number().optional(),
    reason: z.string(),
    attempts: z.number(),
    resettable: z.boolean(),
  }) as z.ZodType<ITaskResponse<T>>;
};

export const taskBlockDuplicationParamSchema = z
  .object({
    blockDuplication: z.boolean().optional(),
  })
  .describe('taskBlockDuplicationParamSchema');
