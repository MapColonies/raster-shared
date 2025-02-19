import { z } from 'zod';
import { IJobResponse } from '@map-colonies/mc-priority-queue';
import { exportJobParametersSchema } from '../../schemas/export/job.schema';
import { ExportTaskParameters } from './task.type';

export type ExportJobParameters = z.infer<typeof exportJobParametersSchema>;

export type JobExportResponse = IJobResponse<ExportJobParameters, ExportTaskParameters>;
