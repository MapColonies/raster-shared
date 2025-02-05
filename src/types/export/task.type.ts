import z from 'zod';
import { exportTaskParametersSchema } from '../../schemas/export/task.schema';

export type ExportTaskParameters = z.infer<typeof exportTaskParametersSchema>;
