import { z } from 'zod';
import { IJobResponse, OperationStatus } from '@map-colonies/mc-priority-queue';
import { RASTER_DOMAIN } from '../../constants';
import { createTaskResponseSchema } from './task.schema';
import { resourceIdSchema, versionSchema, productTypeSchema } from './layer.schema';

export const createJobResponseSchema = <T, P>(
  jobParametersSchema?: z.ZodType<T>,
  taskParametersSchema?: z.ZodType<P>
): z.ZodType<IJobResponse<T, P>> => {
  const tasksSchema = taskParametersSchema ? z.array(createTaskResponseSchema(taskParametersSchema)) : z.array(createTaskResponseSchema());

  const schema = z.object({
    id: z.string().uuid(),
    resourceId: resourceIdSchema,
    version: versionSchema,
    type: z.string(),
    description: z.string(),
    parameters: jobParametersSchema ?? z.unknown(),
    reason: z.string(),
    tasks: tasksSchema.optional(),
    created: z.string(),
    updated: z.string(),
    status: z.nativeEnum(OperationStatus),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    percentage: z.number().min(0).max(100),
    isCleaned: z.boolean(),
    priority: z.number(),
    internalId: z.string().optional().nullable(),
    producerName: z.string().optional().nullable(),
    productName: z.string().optional().nullable(),
    productType: productTypeSchema.optional(),
    taskCount: z.number().int().min(0),
    completedTasks: z.number().int().min(0),
    failedTasks: z.number().int().min(0),
    expiredTasks: z.number().int().min(0),
    pendingTasks: z.number().int().min(0),
    inProgressTasks: z.number().int().min(0),
    abortedTasks: z.number().int().min(0),
    additionalIdentifiers: z.string().optional().nullable(),
    expirationDate: z.coerce.date().optional().nullable(),
    domain: z.literal(RASTER_DOMAIN),
  });

  return schema as z.ZodType<IJobResponse<T, P>>;
};
