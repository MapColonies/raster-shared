import { z } from 'zod';
import { exportJobParametersSchema } from '../../schemas/export/job.schema';

export type ExportJobParameters = z.infer<typeof exportJobParametersSchema>;
