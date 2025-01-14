import { z } from 'zod';
import { callbackUrlSchema, callbackUrlsArraySchema, exportAdditionalParamsSchema, exportInputParamsSchema } from '../../schemas/export/job.schema';
import {
  callbackExportResponseSchema,
  cleanupDataSchema,
  featureCollectionSchema,
  fileNamesTemplatesSchema,
} from '../../schemas/export/export.schema';

export type CallbackUrls = z.infer<typeof callbackUrlSchema>;
export type CallbackUrlsTargetArray = z.infer<typeof callbackUrlsArraySchema>;
export type CleanupData = z.infer<typeof cleanupDataSchema>;
export type CallbackExportResponse = z.infer<typeof callbackExportResponseSchema>;
export type LinksDefinition = z.infer<typeof fileNamesTemplatesSchema>;
export type ExportInputParams = z.infer<typeof exportInputParamsSchema>;
export type ExportAdditionalParams = z.infer<typeof exportAdditionalParamsSchema>;
export type ExportFeatureCollection = z.infer<typeof featureCollectionSchema>;
