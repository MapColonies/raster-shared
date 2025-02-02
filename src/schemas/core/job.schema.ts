import { z } from 'zod';
import { IJobResponse, OperationStatus } from '@map-colonies/mc-priority-queue';
import { createTaskResponseSchema } from './task.schema';

export const createJobResponseSchema = <T, P>(
  jobParametersSchema?: z.ZodType<T>,
  taskParametersSchema?: z.ZodType<P>
): z.ZodType<IJobResponse<T, P>> => {
  const tasksSchema = taskParametersSchema ? z.array(createTaskResponseSchema(taskParametersSchema)) : z.array(createTaskResponseSchema());

  const schema = z.object({
    id: z.string().uuid(),
    resourceId: z.string(),
    version: z.string(),
    type: z.string(),
    description: z.string(),
    parameters: jobParametersSchema ?? z.unknown(),
    reason: z.string(),
    tasks: tasksSchema.optional(),
    created: z.string(),
    updated: z.string(),
    status: z.nativeEnum(OperationStatus),
    percentage: z.number(),
    isCleaned: z.boolean(),
    priority: z.number(),
    internalId: z.string().optional(),
    producerName: z.string().optional().nullable(),
    productName: z.string().optional(),
    productType: z.string().optional(),
    taskCount: z.number(),
    completedTasks: z.number(),
    failedTasks: z.number(),
    expiredTasks: z.number(),
    pendingTasks: z.number(),
    inProgressTasks: z.number(),
    abortedTasks: z.number(),
    additionalIdentifiers: z.string().optional().nullable(),
    expirationDate: z.date().optional().nullable(),
    domain: z.string(),
  });

  return schema as z.ZodType<IJobResponse<T, P>>;
};
