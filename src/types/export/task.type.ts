import z from 'zod';
import { exportFinalizeFullProcessingParamsSchema, exportFinalizeTaskParamsSchema } from '../../schemas';

export type ExportFinalizeTaskParams = z.infer<typeof exportFinalizeTaskParamsSchema>;
export type ExportFinalizeFullProcessingParams = z.infer<typeof exportFinalizeFullProcessingParamsSchema>;
export type ExportFinalizeErrorCallbackParams = z.infer<typeof exportFinalizeTaskParamsSchema>;
