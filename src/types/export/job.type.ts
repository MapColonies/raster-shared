import { z } from 'zod';
import { exportJobParametersSchema } from '../../schemas/export/job.schema';
import { exportFinalizeTaskParamsSchema } from '../../schemas';

export type ExportJobParameters = z.infer<typeof exportJobParametersSchema>;
export type ExportFinalizeTaskParameters = z.infer<typeof exportFinalizeTaskParamsSchema>;
