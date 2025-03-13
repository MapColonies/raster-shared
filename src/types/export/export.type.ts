import { z } from 'zod';
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import { callbackUrlSchema, callbackUrlsArraySchema, exportAdditionalParamsSchema, exportInputParamsSchema } from '../../schemas/export/job.schema';
import {
  artifactsArraySchema,
  callbackExportResponseSchema,
  cleanupDataSchema,
  fileNamesTemplatesSchema,
  roiPropertiesSchema,
} from '../../schemas/export/export.schema';

export type RoiProperties = z.infer<typeof roiPropertiesSchema>;
export type RoiFeature = Feature<Polygon | MultiPolygon, RoiProperties>;
export type RoiFeatureCollection = FeatureCollection<Polygon | MultiPolygon, RoiProperties>;
export type CallbackUrl = z.infer<typeof callbackUrlSchema>;
export type CallbackUrlsTargetArray = z.infer<typeof callbackUrlsArraySchema>;
export type CleanupData = z.infer<typeof cleanupDataSchema>;
export type CallbackExportResponse = z.infer<typeof callbackExportResponseSchema>;
export type LinksDefinition = z.infer<typeof fileNamesTemplatesSchema>;
export type ExportInputParams = z.infer<typeof exportInputParamsSchema>;
export type ExportAdditionalParams = z.infer<typeof exportAdditionalParamsSchema>;
export type ArtifactsArray = z.infer<typeof artifactsArraySchema>;
