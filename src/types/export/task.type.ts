import z from 'zod';
import { exportFinalizeFullProcessingParamsSchema, exportFinalizeTaskParamsSchema } from '../../schemas';

export type ExportFinalizeTaskParamsSchema = z.infer<typeof exportFinalizeTaskParamsSchema>;
export type ExportFinalizeFullProcessingParamsSchema = z.infer<typeof exportFinalizeFullProcessingParamsSchema>;
export type ExportFinalizeErrorCallbackParamsSchema = z.infer<typeof exportFinalizeTaskParamsSchema>;
