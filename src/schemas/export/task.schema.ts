import z from 'zod';
import { ExportFinalizeType } from '../../constants';

export const exportFinalizeFullProcessingParamsSchema = z.object({
  type: z.literal(ExportFinalizeType.Full_Processing),
  gpkgModified: z.boolean(),
  gpkgUploadedToS3: z.boolean(),
  callbacksSent: z.boolean(),
});

export const exportFinalizeErrorCallbackParamsSchema = z.object({
  type: z.literal(ExportFinalizeType.Error_Callback),
  callbacksSent: z.boolean(),
});

export const exportFinalizeTaskParamsSchema = z.discriminatedUnion('type', [
  exportFinalizeFullProcessingParamsSchema,
  exportFinalizeErrorCallbackParamsSchema,
]);
