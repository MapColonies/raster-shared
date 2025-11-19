import { z } from 'zod';
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import { exportAdditionalParamsSchema, exportInputParamsSchema } from '../../schemas/export/job.schema';
import {
  artifactsArraySchema,
  callbackExportResponseSchema,
  callbacksStatus,
  cleanupDataSchema,
  fileNamesTemplatesSchema,
  linksSchema,
  roiPropertiesSchema,
} from '../../schemas/export/export.schema';
import { callbackUrlsArraySchema, callbackUrlSchema } from '../../schemas/core/callback.schema';

export type RoiProperties = z.infer<typeof roiPropertiesSchema>;
export type RoiFeature = Feature<Polygon | MultiPolygon, RoiProperties>;
export type RoiFeatureCollection = FeatureCollection<Polygon | MultiPolygon, RoiProperties>;

export type CallbackUrl = z.infer<typeof callbackUrlSchema>;
export type CallbackUrlsTargetArray = z.infer<typeof callbackUrlsArraySchema>;
export type CallbackExportResponse = z.infer<typeof callbackExportResponseSchema>;
export type CallbacksStatus = z.infer<typeof callbacksStatus>;

export type CleanupData = z.infer<typeof cleanupDataSchema>;
export type LinksDefinition = z.infer<typeof linksSchema>;
export type FileNamesTemplates = z.infer<typeof fileNamesTemplatesSchema>;
export type ExportInputParams = z.infer<typeof exportInputParamsSchema>;
export type ExportAdditionalParams = z.infer<typeof exportAdditionalParamsSchema>;
export type ArtifactsArray = z.infer<typeof artifactsArraySchema>;
