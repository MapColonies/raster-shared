import z from 'zod';
import { deleteTaskParamsSchema, deleteStoredResourcesParamsSchema } from '../../schemas/deletion/task.schema';

export type DeleteTaskParams = z.infer<typeof deleteTaskParamsSchema>;
export type DeleteStoredResourcesParams = z.infer<typeof deleteStoredResourcesParamsSchema>;
