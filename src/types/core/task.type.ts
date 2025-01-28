import z from 'zod';
import { taskBlockDuplicationParamSchema } from '../../schemas/core/task.schema';

export type TaskBlockDuplicationParam = z.infer<typeof taskBlockDuplicationParamSchema>;
