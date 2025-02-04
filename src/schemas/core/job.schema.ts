import { z, ZodType } from 'zod';
import { IJobResponse, OperationStatus } from '@map-colonies/mc-priority-queue';
import { INGESTION_VALIDATIONS, RasterProductTypes } from '../../constants';
import { createTaskResponseSchema } from './task.schema';

export const rasterProductTypeSchema: ZodType<RasterProductTypes> = z.nativeEnum(RasterProductTypes);
export const resourceIdSchema = z.string().regex(new RegExp(INGESTION_VALIDATIONS.productId.pattern));

export const createJobResponseSchema = <T, P>(
  jobParametersSchema?: z.ZodType<T>,
  taskParametersSchema?: z.ZodType<P>
): z.ZodType<IJobResponse<T, P>> => {
  const tasksSchema = taskParametersSchema ? z.array(createTaskResponseSchema(taskParametersSchema)) : z.array(createTaskResponseSchema());

  const schema = z.object({
    id: z.string().uuid(),
    resourceId: resourceIdSchema,
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
    internalId: z.string().optional().nullable(),
    producerName: z.string().optional().nullable(),
    productName: z.string().optional(),
    productType: rasterProductTypeSchema.optional(),
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
